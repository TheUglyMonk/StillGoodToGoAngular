import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../Models/Publication';
import { PublicationService } from '../../../Services/publication.service';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications: Publication[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  shopId: number = 2; // Hardcoded for now

  constructor(
    private publicationService: PublicationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('Shop ID:', this.shopId);
    this.loadPublications();
  }

  loadPublications(): void {
    this.isLoading = true; // Start loading
    this.errorMessage = ''; // Clear previous errors
  
    console.log('Fetching publications for shopId:', this.shopId);
  
    this.publicationService.getPublicationsByEstablishmentId(this.shopId).subscribe({
      next: (data) => {
        console.log('Publications loaded successfully:', data);
        this.publications = data;
        this.isLoading = false; // Stop loading
      },
      error: (error) => {
        console.error('Error fetching publications:', error);
        this.errorMessage = 'Erro ao carregar publicações.';
        this.publications = []; 
        this.isLoading = false; 
      }
    });
  }}