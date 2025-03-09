// user.component.ts
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { SaleService } from '../../Services/sale.service';
import { Sale } from '../../Models/Sale';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


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
  updating = false;
  updateError: string | null = null;
  editMode = false;

  constructor(
    private clientService: ClientService,
    private saleService: SaleService, private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getSales();
  
    console.log('🔹 Test API call manually');
    this.clientService.updateUserInfo({ username: 'TestUser' }).subscribe({
      next: (res) => console.log('Test API response:', res),
      error: (err) => console.error('Test API error:', err)
    });
  }

  getUserInfo() {
    // Get user info from the API
    this.clientService.getUserInfo().subscribe((data) => {
      this.userInfo = data;
      this.loading = false;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    console.log('Initializing form with:', this.userInfo);
    if (this.userInfo) {
      this.updateForm = this.fb.group({
        username: [this.userInfo.username, Validators.required],
        email: [this.userInfo.email, [Validators.required, Validators.email]],
        password: ['', Validators.required],
        nif: [this.userInfo.nif, Validators.required]
      });
    }
  }

  toggleEdit(): void {
    console.log('toggleEdit() called. Current state:', this.editMode);
    this.editMode = !this.editMode;
  }

  onSubmit(): void {
    if (this.updateForm.invalid) return;
    console.log('📤 Submitting update form with:', this.updateForm.value);
    
    this.updating = true;
    this.clientService.updateUserInfo(this.updateForm.value).subscribe({
      next: (updatedUser) => {
        console.log('✅ Update successful. Response:', updatedUser);
        this.userInfo = updatedUser;
        this.updating = false;
      },
      error: (err) => {
        console.error('❌ Update failed:', err);
        console.error('📌 Error details:', err.message, err.status, err.error);
        this.updateError = 'Update failed. Please try again.';
        this.updating = false;
      }
    });
  }
  

  getSales() {
    // Get the sales data for the client
    this.saleService.getSales().subscribe((data) => {
      console.log('Sales Data:', data); // Log sales data to inspect
      this.sales = data;
    });
  }
}
