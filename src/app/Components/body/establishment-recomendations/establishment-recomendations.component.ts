import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { EstablishmentService } from '../../../Services/establishment.service';
import { Establishment } from '../../../Models/Establishment';
import { CommonModule } from '@angular/common';
import { Category } from '../../../Models/Enums/Category'; // Import your enum

@Component({
  selector: 'app-establishment-recommendations',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './establishment-recomendations.component.html',
  styleUrls: ['./establishment-recomendations.component.css']
})
export class EstablishmentRecomendationsComponent implements OnInit {
  recommendations: (Establishment & { categoryNames: string[] })[] = []; // Add categoryNames

  constructor(private establishmentService: EstablishmentService) {}

  ngOnInit() {
    this.establishmentService.getEstablishments().subscribe(establishments => {
      this.recommendations = this.getRandomEstablishments(establishments, 5).map(est => ({
        ...est,
        categoryNames: est.categories.map(catId => Category[catId] || 'Desconhecido') // Map categories
      }));
    });
  }

  private getRandomEstablishments(establishments: Establishment[], count: number): Establishment[] {
    return establishments.sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
