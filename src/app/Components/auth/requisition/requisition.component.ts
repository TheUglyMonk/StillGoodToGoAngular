import { Component } from '@angular/core';
import { RequisitionService } from '../../../Services/requisition.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-requisition',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.css']
})
export class RequisitionComponent {
  requisition: any[] = []; // Corrigido para aceitar requisições
  requisitionForm: FormGroup; // Nome do form corrigido para `requisitionForm`

  constructor(private requisitionService: RequisitionService, private fb: FormBuilder) {
    this.requisitionForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required]], // Adicionada validação de e-mail
      password: ['', Validators.required],
      latitude: [0, Validators.required], // Mantido como número
      longitude: [0, Validators.required], // Mantido como número
      description: ['', Validators.required],
      category: [[], Validators.required], // Mantido como array para categorias
    });
  }

  onSubmit(): void {
    if (this.requisitionForm.invalid) {
      console.error('Formulário inválido. Preencha todos os campos obrigatórios.');
      return;
    }
    
    // Converte o valor da categoria para array, se não estiver já em formato de array
    const formData = { ...this.requisitionForm.value };
    formData.category = Array.isArray(formData.category) ? formData.category : [formData.category];
    
    this.requisitionService.createRequisition(formData).subscribe({
      next: (newRequisition) => {
        this.requisition.push(newRequisition);
        this.clearForm();
        console.log('Requisição criada com sucesso!', newRequisition);
      },
      error: (error) => {
        console.error('Erro ao criar requisição', error);
      }
    });
  }

  clearForm(): void {
    this.requisitionForm.reset({
      userName: '',
      email: '',
      password: '',
      latitude: 0,
      longitude: 0,
      description: '',
      categories: []
    });
  }
}
