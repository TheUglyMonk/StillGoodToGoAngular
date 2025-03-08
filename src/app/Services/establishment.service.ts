import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
