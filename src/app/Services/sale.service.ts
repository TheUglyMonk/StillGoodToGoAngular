import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap, tap, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Sale } from '../Models/Sale';
import { EstablishmentService } from './establishment.service';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private saleUrl = `${environment.apiBaseUrl}/sale`;
  private clientId = 2;

  constructor(
    private http: HttpClient,
    private establishmentService: EstablishmentService
  ) {}

  getSalesByEstablishmentId(establishmentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.saleUrl}/establishment/${establishmentId}`);
  }
  
  buyPublication(publicationId: number, clientId: number, paymentMethod: string): Observable<any> {
    const body = { paymentMethod };
    return this.http.post(`${this.saleUrl}/${publicationId}/${clientId}`, body);
  }

  getSales(): Observable<Sale[]> {
    return this.http.get<any>(`${this.saleUrl}/client/${this.clientId}`).pipe(
      tap((response) => console.log('Sales Response:', response)),
      switchMap((response) => {
        let sales: Sale[];
        if (Array.isArray(response)) {
          sales = response;
        } else if (response && response.sales && Array.isArray(response.sales)) {
          sales = response.sales;
        } else if (response && !Array.isArray(response)) {
          sales = [response];
        } else {
          sales = [];
        }

        if (!sales.length) {
          return of([]); 
        }

        const requests = sales.map((sale: Sale) =>
          this.establishmentService.getEstablishmentInfo(sale.establishmentId).pipe(
            map((establishment) => ({
              ...sale,
              establishmentName: establishment.username, // Add establishment name to the sale
            }))
          )
        );

        return forkJoin(requests);
      })
    );
  }
}
