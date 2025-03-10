import { Injectable } from '@angular/core';
import { Publication } from '../Models/Publication';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = `${environment.apiBaseUrl}/publications/available`; 

  constructor(private http: HttpClient) { }

  getLatestPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }
}