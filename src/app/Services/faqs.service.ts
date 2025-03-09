import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Faq } from '../Models/Faq';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  private apiUrl = `${environment.apiBaseUrl}/faqs`;

  constructor(private http: HttpClient) { }

  getFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.apiUrl);
  }

  createFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(this.apiUrl, faq);
  }

  updateFaq(id: number, faq: Faq): Observable<Faq> {
    return this.http.put<Faq>(`${this.apiUrl}/${id}`, faq);
  }

  deleteFaq(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
