import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequisitionService } from '../../../Services/requisition.service';
import { Requisition } from '../../../Models/Requisition';
import { StatusRequest } from '../../../Models/Enums/StatusRequest';

@Component({
  selector: 'app-establishment-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './establishment-management.component.html',
  styleUrls: ['./establishment-management.component.css']
})
export class EstablishmentManagementComponent implements OnInit {
  requisitions: Requisition[] = [];
  isLoading: boolean = false;

  constructor(private requisitionService: RequisitionService) { }

  ngOnInit(): void {
    this.loadRequisitions();
  }

  loadRequisitions(): void {
    this.isLoading = true;
    this.requisitionService.getAllRequisitions().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        
        // Converte statusRequest se necessário
        this.requisitions = data.map(req => ({
          ...req,
          statusRequest: this.mapStatus(req.statusRequest) // Converte string para enum
        })).filter(req => req.statusRequest === StatusRequest.Pending);

        console.log('Requisições filtradas:', this.requisitions);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar requisições:', err);
        this.isLoading = false;
      }
    });
  }

  approveRequisition(requisition: Requisition): void {
    requisition.statusRequest = StatusRequest.Approved; // Aprovado
    this.updateRequisition(requisition);
  }

  rejectRequisition(requisition: Requisition): void {
    requisition.statusRequest = StatusRequest.Rejected; // Rejeitado
    this.updateRequisition(requisition);
  }

  private updateRequisition(requisition: Requisition): void {
    this.requisitionService.updateRequisition(requisition).subscribe({
      next: (updated) => {
        console.log('Requisição atualizada com sucesso:', updated);
        // Remove a requisição atualizada da lista local
        this.requisitions = this.requisitions.filter(req => req.id !== requisition.id);
      },
      error: (err) => {
        console.error('Erro ao atualizar requisição:', err);
        alert('Erro ao processar requisição');
      }
    });
  }

  private mapStatus(status: any): StatusRequest {
    if (typeof status === 'string') {
      return StatusRequest[status as keyof typeof StatusRequest] || StatusRequest.Pending;
    }
    return status;
  }
}
