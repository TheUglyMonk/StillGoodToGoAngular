import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInfo } from '../Models/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class ClientService { 
  private apiUrl = `${environment.apiBaseUrl}/client`;
  private clientId = 8;

  constructor(private http: HttpClient) { }

  getFavoriteShops(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favorites/${this.clientId}`);
  }

  removeFavorite(establishmentId: number): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/managefavorite/${this.clientId}/${establishmentId}`,
      {}
    );
  }

  // Method to create a new client
  createClient(clientData: { username: string; email: string; password: string; nif: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, clientData);
  }
  
  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/${this.clientId}`);
  }

  updateUserInfo(user: any): Observable<any> {
    console.log('Calling updateUserInfo API with:', user);
    return this.http.put(`${this.apiUrl}/${this.clientId}`, user).pipe(
      tap(response => console.log('updateUserInfo API response:', response))
    );
  }
}