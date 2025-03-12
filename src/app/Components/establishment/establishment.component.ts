import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicationService } from '../../Services/publication.service';
import { PublicationsComponent } from "../shop/publications/publications.component";
import { EstablishmentService } from '../../Services/establishment.service';
import { Establishment } from '../../Models/Establishment';

@Component({
  selector: 'app-establishment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PublicationsComponent],
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})
export class EstablishmentComponent implements OnInit {
  publicationForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  establishmentId!: number;
  establishment: Establishment | null = null; // Store establishment details
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private publicationService: PublicationService,
    private establishmentService: EstablishmentService // Inject EstablishmentService
  ) { }

  ngOnInit(): void {
    // Get the establishment id from localStorage.
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.establishmentId = user.id;
      console.log("Establishment ID:", this.establishmentId);

      // Fetch establishment details
      this.loadEstablishmentDetails();
    } else {
      this.errorMessage = 'Usuário não encontrado. Faça login como estabelecimento.';
    }

    // Initialize the publication form
    this.publicationForm = this.fb.group({
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      endDate: ['', Validators.required]
    });
  }

  loadEstablishmentDetails(): void {
    this.establishmentService.getEstablishmentInfo(2).subscribe({
      next: (data) => {
        console.log('Establishment details:', data);
        this.establishment = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching establishment details:', error);
        this.errorMessage = 'Erro ao carregar detalhes do estabelecimento.';
        this.isLoading = false;
      }
    });
  }

  submitPublication(): void {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const rawEndDate = this.publicationForm.value.endDate;
    const isoEndDate = new Date(rawEndDate).toISOString();

    const publicationData = { 
      establishmentId: this.establishmentId, 
      description: this.publicationForm.value.description,
      price: this.publicationForm.value.price,
      endDate: isoEndDate  
    };

    this.publicationService.createPublication(publicationData).subscribe({
      next: (response) => {
        console.log('Publication created:', response);
        this.successMessage = 'Publicação criada com sucesso!';
        this.publicationForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error creating publication:', error);
        this.errorMessage = 'Erro ao criar publicação. Tente novamente.';
        this.isSubmitting = false;
      }
    });
  }
}
