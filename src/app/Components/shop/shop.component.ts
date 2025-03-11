import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Establishment } from '../../Models/Establishment';
import { CommonModule } from '@angular/common';
import { ShopReviewsComponent } from './shop-reviews/shop-reviews.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ShopReviewsComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shop!: Establishment;
  showReviews = false;
  isLoading = true;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchShopDetails(+id);
    }
  }

  fetchShopDetails(id: number): void {
    this.http.get<Establishment>(`${environment.apiBaseUrl}/establishment/${id}`)
      .subscribe({
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

  toggleReviews(): void {
    this.showReviews = !this.showReviews;
  }
}
