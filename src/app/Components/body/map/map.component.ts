import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { LatLng } from '../../../Models/LatLng';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMap],
  template: `
    <google-map
      #map
      height="500px"
      width="100%"
      [center]="center"
      [zoom]="zoom">
    </google-map>
  `,
  styles: [
    `
      google-map {
        display: block;
      }
    `
  ]
})

export class MapComponent implements OnChanges, AfterViewInit {
  @Input() markers: LatLng[] = [];
  @ViewChild('map', { static: false }) map!: GoogleMap;

  center: google.maps.LatLngLiteral = { lat: 39.4529522, lng: -8.0676795 }; 
  zoom = 6;

  // Array to store created markers so they can be cleared later
  private googleMapMarkers: google.maps.Marker[] = [];

  // Called after Angular fully initializes the component's view.
  ngAfterViewInit() {
    // Now that the map is available, update the markers if any
    this.updateMarkers(this.markers);
  }

  // Called whenever input properties change
  ngOnChanges(changes: SimpleChanges) {
    if (changes['markers'] && this.markers?.length) {
      // Optionally, update the center to the first marker's position
      this.center = { lat: this.markers[0].lat, lng: this.markers[0].lng };
      // Try updating markers only if the map is ready
      if (this.map && this.map.googleMap) {
        this.updateMarkers(this.markers);
      }
    }
  }

  // Public method to update the view (center and zoom)
  public updateView(center: google.maps.LatLngLiteral, zoom: number): void {
    if (this.map && this.map.googleMap) {
      this.map.googleMap.setCenter(center);
      this.map.googleMap.setZoom(zoom);
    }
  }

  // Clears any existing markers and adds new markers from markersToShow
  private updateMarkers(markersToShow: LatLng[]) {
    if (!this.map || !this.map.googleMap) return;

    // Remove existing markers from the map
    this.googleMapMarkers.forEach(marker => marker.setMap(null));
    this.googleMapMarkers = [];

    // Create and add new markers to the map and store them
    markersToShow.forEach(markerData => {
      const marker = new google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map: this.map.googleMap
      });
      this.googleMapMarkers.push(marker);
    });
  }
}
