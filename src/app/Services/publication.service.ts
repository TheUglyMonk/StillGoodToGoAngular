import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Publication } from '../Models/Publication';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = `${environment.apiBaseUrl}/publications`; 

  constructor(private http: HttpClient) { }

  getLatestPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/all/available`);
  }

  getPublicationsByEstablishmentId(establishmentId: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/establishment/${establishmentId}`);
  }

  createPublication(publicationData: any): Observable<Publication> {
    console.log(publicationData);
    return this.http.post<Publication>(this.apiUrl, publicationData);
  }
}