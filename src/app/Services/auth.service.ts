import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInfo } from '../Models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/user/login`;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  // Retrieves the full user object from localStorage
  getUser(): UserInfo | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) as UserInfo : null;
  }

  // Retrieves the user id from localStorage
  getUserId(): number {
    const user = this.getUser();
    return user ? user.id : 0; // Return 0 or handle the absence as needed
  }
}
