import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInfo } from '../Models/UserInfo';
import { AuthService } from './auth.service';
import { Review } from '../Models/Review';

@Injectable({
  providedIn: 'root',
})
export class ClientService { 
  private apiUrl = `${environment.apiBaseUrl}/client`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFavoriteShops(): Observable<any[]> {
    const clientId = this.authService.getUserId();
    return this.http.get<any[]>(`${this.apiUrl}/favorites/${clientId}`);
  }

  removeFavorite(establishmentId: number): Observable<void> {
    const clientId = this.authService.getUserId();
    return this.http.post<void>(
      `${this.apiUrl}/managefavorite/${clientId}/${establishmentId}`,
      {}
    );
  }

  getClientReviews(clientId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiBaseUrl}/reviews/client/${clientId}`);
  }

  toggleFavorite(establishmentId: number): Observable<any> {
    const clientId = this.authService.getUserId();
    return this.http.post<any>(`${this.apiUrl}/managefavorite/${clientId}/${establishmentId}`, {});
  }

  createClient(clientData: { username: string; email: string; password: string; nif: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, clientData);
  }
  
  getUserInfo(): Observable<UserInfo> {
    const clientId = this.authService.getUserId();
    return this.http.get<UserInfo>(`${this.apiUrl}/${clientId}`);
  }

  getBalance(): Observable<UserInfo> {
    const clientId = this.authService.getUserId();
    return this.http.get<UserInfo>(`${this.apiUrl}/balance/${clientId}`)
  }

  addFund(clientData: { value: number }): Observable<UserInfo> {
    const clientId = this.authService.getUserId();
    return this.http.post<UserInfo>(`${this.apiUrl}/addFunds/${clientId}`, clientData);
  }
  
  getTotalAmountSpent(): Observable<UserInfo> {
    const clientId = this.authService.getUserId();
    console.log(clientId)
    return this.http.get<UserInfo>(`${this.apiUrl}/totalamountspent/${clientId}`)
  }

  updateUserInfo(user: any): Observable<any> {
    const clientId = this.authService.getUserId();
    return this.http.put(`${this.apiUrl}/${clientId}`, user).pipe(
      tap(response => console.log('updateUserInfo API response:', response))
    );
  }
}
