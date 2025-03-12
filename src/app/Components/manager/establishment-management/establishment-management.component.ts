import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequisitionService } from '../../../Services/requisition.service';
import { Requisition } from '../../../Models/Requisition';
import { StatusRequest } from '../../../Models/Enums/StatusRequest';
import { Establishment } from '../../../Models/Establishment';
import { EstablishmentService } from '../../../Services/establishment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-establishment-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './establishment-management.component.html',
  styleUrls: ['./establishment-management.component.css']
})
export class EstablishmentManagementComponent implements OnInit {
  requisitions: Requisition[] = [];
  establishments: Establishment[] = [];
  isLoading: boolean = false;
  isUpdateModalOpen: boolean = false;
  selectedEstablishment: Establishment | null = null;

  constructor(private requisitionService: RequisitionService, private establishmentService: EstablishmentService) { }

  ngOnInit(): void {
    this.loadRequisitions(),
    this.loadEstablishments();
  }

  loadEstablishments(): void {
    this.isLoading = true;
    this.establishmentService.getActiveEstablishment().subscribe({
      next: (data) => {
        this.establishments = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar estabelecimentos:', err);
        this.isLoading = false;
      }
    });
  }

  openUpdateModal(establishment: Establishment): void {
    this.selectedEstablishment = { ...establishment };
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal(): void {
    this.isUpdateModalOpen = false;
    this.selectedEstablishment = null;
  }

  onUpdateSubmit(): void {
    if (this.selectedEstablishment) {
      this.updateEstablishment(this.selectedEstablishment);
      this.closeUpdateModal();
    }
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
    this.loadEstablishments();
  }

  rejectRequisition(requisition: Requisition): void {
    requisition.statusRequest = StatusRequest.Rejected; // Rejeitado
    this.updateRequisition(requisition);
  }

  private updateRequisition(requisition: Requisition): void {
    const { id, ...requisitionWithoutId } = requisition;
  
    this.requisitionService.updateRequisition(requisition.id, requisitionWithoutId).subscribe({
      next: (updated) => {
        console.log('Requisição atualizada com sucesso:', updated);
        this.requisitions = this.requisitions.filter(req => req.id !== requisition.id);
        this.loadEstablishments();
      },
      error: (err) => {
        console.error('Erro ao atualizar requisição:', err);
        alert('Erro ao processar requisição');
      }
    });
  }

  private updateEstablishment(establishment: Establishment): void {
    const { id, ...establishmentWithoutId } = establishment;

    this.establishmentService.updateEstablishment(id, establishmentWithoutId).subscribe({
      next: (updated) => {
        console.log('Estabelecimento atualizado com sucesso:', updated);
        this.establishments = this.establishments.map(est => 
          est.id === updated.id ? updated : est
        );
      },
      error: (err) => {
        console.error('Erro ao atualizar estabelecimento:', err);
        alert('Erro ao processar estabelecimento');
      }
    });
  }

  deactivateEstablishment(establishmentId: number): void {
    if (confirm('Tem certeza que deseja desativar este estabelecimento?')) {
      this.establishmentService.patchEstablishment(establishmentId).subscribe({
        next: () => {
          alert('Estabelecimento desativado com sucesso!');
          this.loadRequisitions(); 
          this.loadEstablishments();
        },
        error: () => {
          alert('Erro ao desativar estabelecimento.');
        }
      });
    }
  }
  
  

  private mapStatus(status: any): StatusRequest {
    if (typeof status === 'string') {
      return StatusRequest[status as keyof typeof StatusRequest] || StatusRequest.Pending;
    }
    return status;
  }
}
