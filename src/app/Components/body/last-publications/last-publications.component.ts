import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../../Services/publication.service';
import { CommonModule } from '@angular/common';
import { Publication } from '../../../Models/Publication';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-last-publications',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './last-publications.component.html',
  styleUrl: './last-publications.component.css'
})
export class LastPublicationsComponent implements OnInit {
  publications: Publication[] = [];
  showAll: boolean = false;

  constructor(private publicationsService: PublicationService, private router: Router) {}

  ngOnInit(): void {
    this.publicationsService.getLatestPublications().subscribe(
      (data) => {
        this.publications = data;
      },
      (error) => {
        console.error('Error fetching publications:', error);
      }
    );
  }

  toggleViewAll(): void {
    this.showAll = !this.showAll;
  }

  navigateToEstablishment(establishmentId: number): void {
    console.log(establishmentId);
    this.router.navigate(['', establishmentId]);
  }
}
