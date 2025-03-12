import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Establishment } from '../../Models/Establishment';
import { CommonModule } from '@angular/common';
import { ShopReviewsComponent } from './shop-reviews/shop-reviews.component';
import { environment } from '../../../environments/environment';
import { ClientService } from '../../Services/client.service';
import { Category } from '../../Models/Enums/Category';
import { PublicationsComponent } from "./publications/publications.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ShopReviewsComponent, PublicationsComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shop!: Establishment & { categoryNames?: string[] }; // Allow optional categoryNames
  showReviews = false;
  isLoading = true;
  errorMessage = '';
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private clientService: ClientService
  ) {}

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
          console.log('Establishment data received:', data);
          // Map category IDs to names
          const categoryNames = data.categories.map((catId: number) => Category[catId]);
          // Extend the shop object with categoryNames
          this.shop = { ...data, categoryNames };
          this.isLoading = false;
          // After loading shop details, check if it's favorited
          this.checkFavoriteStatus();
        },
        error: (err) => {
          console.error('Error fetching shop details:', err);
          this.errorMessage = 'Failed to load shop details.';
          this.isLoading = false;
        }
      });
  }

  checkFavoriteStatus(): void {
    // Use the clientService to get favorite shops and check if current shop is liked.
    this.clientService.getFavoriteShops().subscribe({
      next: (favorites) => {
        // Assume favorites is an array of establishments or objects with an 'id' property.
        this.isFavorite = favorites.some((fav: any) => fav.id === this.shop.id);
        console.log('Favorite status:', this.isFavorite);
      },
      error: (err) => {
        console.error('Error checking favorite status:', err);
      }
    });
  }

  toggleReviews(): void {
    this.showReviews = !this.showReviews;
  }

  toggleLike(): void {
    this.clientService.toggleFavorite(this.shop.id).subscribe({
      next: (response) => {
        console.log('Toggle favorite response:', response);
        // Toggle local like state; ideally, you get confirmation from the API.
        this.isFavorite = !this.isFavorite;
      },
      error: (error) => {
        console.error('Error toggling favorite:', error);
      }
    });
  }
}
