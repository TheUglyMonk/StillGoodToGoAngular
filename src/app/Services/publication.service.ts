import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiBaseUrl = `${environment.apiBaseUrl}/publications`;
  private dotNetUrl = `${environment.dotNetUrl}/publications`;

  constructor() { }
}
