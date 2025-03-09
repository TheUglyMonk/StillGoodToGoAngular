import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgIf,CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteShops: any[] = [];
  loading = true;

  constructor(private clientService: ClientService) {}

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
}
