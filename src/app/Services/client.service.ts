import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInfo } from '../Models/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.apiBaseUrl}/client`;
  private clientId = 1; // Temporary client ID until login/cache is implemented

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

    getUserInfo(): Observable<UserInfo> {
      return this.http.get<UserInfo>(`${this.apiUrl}/${this.clientId}`);
    }
}