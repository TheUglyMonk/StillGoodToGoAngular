import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstablishmentService } from '../../Services/establishment.service';
import { Establishment } from '../../Models/Establishment';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  shop!: Establishment;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private establishmentService: EstablishmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchShopDetails(+id);
    }
  }

  fetchShopDetails(id: number): void {
    this.establishmentService.getEstablishmentInfo(id).subscribe({
      next: (data) => {
        this.shop = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching shop details:', err);
        this.errorMessage = 'Failed to load shop details.';
        this.isLoading = false;
      }
    });
  }
}