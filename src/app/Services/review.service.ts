import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Review } from '../Models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewUrl = `${environment.apiBaseUrl}/reviews/establishment`;

  constructor(private http: HttpClient) {}

  getReviewsByEstablishmentId(establishmentId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewUrl}/${establishmentId}`);
  }
}
