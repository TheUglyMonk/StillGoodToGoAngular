import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Publication } from '../../../Models/Publication';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent implements OnInit {
  @Input() shopId!: number;
  publications: Publication[] = [];
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   
      this.fetchPublications();
    
  }

  fetchPublications(): void {
    this.http.get<Publication[]>(`${environment.apiBaseUrl}/publications/establishment/2`)
      .subscribe({
        next: (data) => {
          console.log('Publications received:', data);
          this.publications = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching publications:', error);
          this.errorMessage = 'Falha ao carregar publicações.';
          this.loading = false;
        }
      });
  }
}