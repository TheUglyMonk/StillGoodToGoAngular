import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { SaleService } from '../../Services/sale.service';
import { Sale } from '../../Models/Sale';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../../Models/Review';
import { EstablishmentService } from '../../Services/establishment.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, NgIf, NgForOf, ReactiveFormsModule],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  loading = true;
  userInfo: any;
  updateForm!: FormGroup;
  sales: Sale[] = [];
  reviews: Review[] = [];
  updating = false;
  updateError: string | null = null;
  editMode = false;

  constructor(
    private clientService: ClientService,
    private saleService: SaleService, 
    private establishmentService: EstablishmentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getSales();
    this.getReviews(); // Fetch reviews on init
  }

  getUserInfo() {
    this.clientService.getUserInfo().subscribe((data) => {
      this.userInfo = data;
      this.loading = false;
      this.initializeForm(); // ✅ Call the missing method
    });
  }

  initializeForm(): void {
    if (this.userInfo) {
      this.updateForm = this.fb.group({
        username: [this.userInfo.username, Validators.required],
        email: [this.userInfo.email, [Validators.required, Validators.email]],
        password: ['', Validators.required],
        nif: [this.userInfo.nif, Validators.required]
      });
    }
  }

  getSales() {
    this.saleService.getSales().subscribe((data) => {
      this.sales = data;
    });
  }

   getReviews() {
    this.clientService.getClientReviews(2).subscribe((reviews) => {
      this.reviews = reviews;
      
      // ✅ Fetch establishment details for each review
      this.reviews.forEach((review) => {
        this.establishmentService.getEstablishmentInfo(review.establishmentId).subscribe(
          (establishment) => {
            review.establishmentUsername = establishment.username; // ✅ Store username
          },
          (error) => console.error("Error fetching establishment info:", error)
        );
      });

    }, error => {
      console.error("Error fetching reviews:", error);
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  onSubmit(): void {
    if (this.updateForm.invalid) return;
    this.updating = true;

    this.clientService.updateUserInfo(this.updateForm.value).subscribe({
      next: (updatedUser) => {
        this.userInfo = updatedUser;
        this.updating = false;
      },
      error: (err) => {
        this.updateError = 'Update failed. Please try again.';
        this.updating = false;
      }
    });
  }
}
