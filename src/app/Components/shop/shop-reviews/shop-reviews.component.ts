import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../../Models/Review';
import { ReviewService } from '../../../Services/review.service';

@Component({
  selector: 'app-shop-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-reviews.component.html',
  styleUrls: ['./shop-reviews.component.css']
})
export class ShopReviewsComponent implements OnInit {
  @Input() shopId!: number;
  reviews: Review[] = [];
  loading = true;
  errorMessage = '';

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    if (this.shopId) {
      this.fetchReviews();
    }
  }

  fetchReviews(): void {
    this.reviewService.getReviewsByEstablishmentId(this.shopId).subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
        this.errorMessage = 'Falha ao carregar as avaliações.';
        this.loading = false;
      }
    });
  }
}
