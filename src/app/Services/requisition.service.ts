import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Requisition } from "../Models/Requisition";

@Injectable({
  providedIn: 'root'})
export class RequisitionService {
    private apiUrl = `${environment.apiBaseUrl}/requisition`;

    constructor(private http: HttpClient) { }

    createRequisition(requisition: Requisition): Observable<Requisition> {
        return this.http.post<Requisition>(this.apiUrl, requisition);
    }

    getAllRequisitions(): Observable<Requisition[]> {
      return this.http.get<Requisition[]>(this.apiUrl).pipe(
          catchError(error => {
              console.error('Erro ao buscar requisições:', error);
              return throwError(() => new Error('Erro ao carregar requisições'));
          })
      );
  }

  updateRequisition(id: number, requisition: Omit<Requisition, 'id'>): Observable<Requisition> {
      return this.http.put<Requisition>(`${this.apiUrl}/${id}/status`, requisition).pipe(
          catchError(error => {
              console.error('Erro ao atualizar requisição:', error);
              return throwError(() => new Error('Erro ao atualizar requisição'));
          })
      );
  }
}