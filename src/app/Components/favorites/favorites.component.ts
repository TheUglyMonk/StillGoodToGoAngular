import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { CommonModule, NgIf } from '@angular/common';
import { PublicationService } from '../../Services/publication.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgIf,CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteShops: any[] = [];
  publications: any[] = [];
  activeShopId: number | null = null;
  loading = true;

  constructor(
    private clientService: ClientService,
    private publicationService: PublicationService
  ) {}


  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.clientService.getFavoriteShops().subscribe(
      (shops) => {
        this.favoriteShops = shops;
      
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao buscar favoritos:', error);
        this.loading = false;
      }
    );
  }

  removeFavorite(establishmentId: number) {
    this.clientService.removeFavorite(establishmentId).subscribe(
      () => {
        // Remove from UI
        this.favoriteShops = this.favoriteShops.filter(shop => shop.id !== establishmentId);
      },
      (error) => console.error('Erro ao remover favorito:', error)
    );
  }

  showPublications(establishmentId: number) {
    if (this.activeShopId === establishmentId) {
      // If already active, toggle off
      this.activeShopId = null;
      this.publications = [];
    } else {
      this.activeShopId = establishmentId;
      this.publicationService.getPublicationsByEstablishmentId(establishmentId).subscribe({
        next: (data) => this.publications = data,
        error: (error) => console.error('Erro ao buscar publicações:', error)
      });
    }
  }
}
