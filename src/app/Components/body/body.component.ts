import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from "./map/map.component";
import { Establishment } from '../../Models/Establishment';
import { EstablishmentService } from '../../Services/establishment.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { City } from '../../Models/City';
import { LatLng } from '../../Models/LatLng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [MapComponent, HttpClientModule,CommonModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'] 
})

export class BodyComponent implements OnInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  establishments: Establishment[] = [];
  filteredLocations: LatLng[] = [];
  cities: City[] = [];
  center: google.maps.LatLngLiteral = { lat: 39.4529522, lng: -8.0676795 };
  zoom: number = 6;
  private subscription!: Subscription;


  constructor(
    private establishmentService: EstablishmentService,
    private http: HttpClient,
    public router: Router
  ) { }

  ngOnInit() {
    this.http.get<City[]>('assets/portuguese-cities.json').subscribe(
      data => { this.cities = data; },
      error => { console.error('Erro ao carregar cidades:', error); }
    );

    this.subscription = this.establishmentService.getEstablishments().pipe(take(1)).subscribe({
      next: (data: Establishment[]) => {
        // Save the full list of establishments if needed
        this.establishments = data;

        // Convert each Establishment into a Marker object with more fields
        this.filteredLocations = data.map(est => ({
          id: est.id,
          lat: est.latitude,
          lng: est.longitude
        }));
        console.log('Markers:', this.filteredLocations);
      },
      error: (error) => console.error('Erro ao buscar estabelecimentos:', error)
    });

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  zoomNearMe(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: google.maps.LatLngLiteral = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.mapComponent.updateView(userLocation, 15);
        },
        (error) => {
          console.error('Erro ao obter localização', error);
          alert('Não foi possível obter sua localização.');
        }
      );
    } else {
      alert('Geolocalização não suportada pelo seu navegador.');
    }
  }

  onCitySelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    if (selectedValue === 'todos') {
      this.filteredLocations = this.establishments.map(est => ({
        id: est.id,
        lat: est.latitude,
        lng: est.longitude
      }));
      this.mapComponent.updateView(this.center, this.zoom);
    } else {
      const selectedCity = this.cities.find(city => city.name === selectedValue);
      if (selectedCity) {
        this.filteredLocations = this.establishments
          .filter(est =>
            Math.abs(est.latitude - selectedCity.center.lat) < 0.2 &&
            Math.abs(est.longitude - selectedCity.center.lng) < 0.2
          )
          .map(est => ({
            id: est.id,
            lat: est.latitude,
            lng: est.longitude
          }));
        this.mapComponent.updateView(selectedCity.center, 12);
      }
    }
  }
}
