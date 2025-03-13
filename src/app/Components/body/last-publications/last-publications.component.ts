import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../../Services/publication.service';
import { CommonModule } from '@angular/common';
import { Publication } from '../../../Models/Publication';
import { RouterModule, Router } from '@angular/router';
import { SaleService } from '../../../Services/sale.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-last-publications',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './last-publications.component.html',
  styleUrl: './last-publications.component.css'
})
export class LastPublicationsComponent implements OnInit {
  publications: Publication[] = [];
  showAll: boolean = false;
  selectedPaymentMethod: { [publicationId: number]: string } = {}; // Stores payment choice per publication
  images: string[] = [
    "https://ser.vitao.com.br/wp-content/uploads/2017/12/shutterstock_252338818-1-920x535.jpg",
    'https://www.madeinmarket.eu/cdn/shop/files/cesta-8-2.jpg?v=1694453228',
    'https://fruteveg.pt/cdn/shop/products/cabaz-misto-eveg-madeira_87a17806-d248-4525-9756-3e5d8cd6649a_1024x1024.jpg?v=1617835088',
    'https://feitocomalma.pt/wp-content/uploads/2020/09/cabaz-horticolas-grande-isabel-inverno-torres-novas-1.png',
    'https://www.cestaverde.pt/imagegen/http://www.cestaverde.pt/client/files/0000000001/26.jpg/460x609/2/'
  ];

  constructor(
    private publicationsService: PublicationService,
    private saleService: SaleService, // ✅ Inject SaleService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.publicationsService.getLatestPublications().subscribe(
      (data) => {
        this.publications = data;
      },
      (error) => {
        console.error('Error fetching publications:', error);
      }
    );
  }

  toggleViewAll(): void {
    this.showAll = !this.showAll;
  }

  getPublicationImage(index: number): string {
    return this.images[index % this.images.length];
  }

  navigateToEstablishment(establishmentId: number): void {
    this.router.navigate(['', establishmentId]);
  }

  buyPublication(publicationId: number, clientId: number): void {
    const paymentMethod = this.selectedPaymentMethod[publicationId] || 'Balance'; // Default to 'Balance'

    this.saleService.buyPublication(publicationId, clientId, paymentMethod).subscribe({
      next: () => {
        alert('Compra realizada com sucesso! ✅');

        // Refresh publications after purchase
        this.publicationsService.getLatestPublications().subscribe(
          (data) => {
            this.publications = data;
          },
          (error) => {
            console.error('Error fetching publications:', error);
          }
        );
      },
      error: (err) => {
        alert('Erro na compra: ' + err.error.message);
        console.error('Compra falhou:', err);
      }
    });
  }
}
