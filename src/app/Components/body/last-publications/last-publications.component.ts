import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../../Services/publication.service';
import { CommonModule } from '@angular/common';
import { Publication } from '../../../Models/Publication';

@Component({
  selector: 'app-last-publications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-publications.component.html',
  styleUrl: './last-publications.component.css'
})
export class LastPublicationsComponent implements OnInit {
  publications: Publication[] = [];
  showAll: boolean = false;

  constructor(private publicationsService: PublicationService) {}

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
}