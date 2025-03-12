import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Establishment } from '../Models/Establishment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  private apiUrl = '/establishment';
  

  constructor(private http: HttpClient) { }

  getEstablishments(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(`${environment.apiBaseUrl}${this.apiUrl}`);
  }

  getEstablishmentInfo(establishmentId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/establishment/${establishmentId}`);
  }

  updateEstablishment(establishmentId: number, establishment: Omit<Establishment, 'id'>): Observable<Establishment>{
    return this.http.put<Establishment>(`${environment.apiBaseUrl}${this.apiUrl}/${establishmentId}`, establishment);
  }

  patchEstablishment(establishmentId: number): Observable<Establishment> {
    return this.http.patch<Establishment>(`${environment.apiBaseUrl}${this.apiUrl}/deactivate/${establishmentId}`, {});
  }

  getActiveEstablishment(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(`${environment.apiBaseUrl}${this.apiUrl}/active`);
  }
  
}