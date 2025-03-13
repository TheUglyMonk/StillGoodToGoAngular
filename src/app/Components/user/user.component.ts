import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { SaleService } from '../../Services/sale.service';
import { Sale } from '../../Models/Sale';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../../Models/Review';
import { EstablishmentService } from '../../Services/establishment.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-user',
  imports: [CommonModule, NgIf, NgForOf, ReactiveFormsModule],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  loading = true;
  userInfo: any;
  updateForm!: FormGroup;
  balance: number | null = null;
  totalAmountSpent: any;
  sales: Sale[] = [];
  reviews: Review[] = [];
  updating = false;
  updateError: string | null = null;
  editMode = false;
  addFundMode = false;
  addFundForm!: FormGroup;
  addingFund = false;
  addFundError: string | null = null;

  constructor(
    private clientService: ClientService,
    private saleService: SaleService, 
    private establishmentService: EstablishmentService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getBalance();
    this.getTotalAmountSpent();
    this.getUserInfo();
    this.getSales();
    this.getReviews();
    this.initializeAddFundForm();
  }

  getUserInfo() {
    this.clientService.getUserInfo().subscribe((data) => {
      this.userInfo = data;
      this.loading = false;
      this.initializeForm(); 
    });
  }

  getBalance() {
    this.clientService.getBalance().subscribe({
      next: (data) => {
        // Supondo que a API retorne um objeto com a propriedade "balance"
        this.balance = data.balance; // ajuste se a estrutura for diferente
      },
      error: (err) => {
        console.error("Erro ao buscar o saldo:", err);
      }
    });
  }

  getTotalAmountSpent(){
    this.clientService.getTotalAmountSpent().subscribe({
      next: (data) => {
        console.log("Resposta da API:", data);
    
        if (data) {
          this.totalAmountSpent = data.totalAmountSpent;
          console.log("Total Gasto:", data);
        } else {
          console.error("Erro: resposta da API está vazia.");
        }
      },
      error: (err) => {
        console.error("Erro ao buscar total gasto: ", err);
      }
    });
  }

  initializeForm(): void {
    if (this.userInfo) {
      this.updateForm = this.fb.group({
        username: [this.userInfo.username, Validators.required],
        email: [this.userInfo.email, [Validators.required, Validators.email]],
        password: ['', Validators.required],
        nif: [this.userInfo.nif, Validators.required]
      });
    }
  }

  getSales() {
    
    this.saleService.getSalesByClient(1).subscribe(
      (data) => {
        this.sales = data;
      },
      (error) => {
        console.error("Error fetching sales:", error);
      }
    );
  }

  openReviewForm(sale: Sale) {
    if (!this.userInfo?.id) {
      alert("Usuário não encontrado.");
      return;
    }
  
    if (!sale.id) {
      alert("Venda não encontrada.");
      return;
    }
  
    const reviewComment = prompt("Digite sua avaliação:");
    const classification = Number(prompt("Dê uma classificação (1-5):"));
  
    if (!reviewComment || isNaN(classification) || classification < 1 || classification > 5) {
      alert("Avaliação inválida!");
      return;
    }
  
    const clientId = this.userInfo.id;
    const saleId = sale.id; 
  
    const review = {
      classification,
      comment: reviewComment
    };
  
    this.clientService.addReview(clientId, saleId, review).subscribe({
      next: (newReview) => {
        sale.review = newReview;
        alert("Avaliação enviada com sucesso!");
      },
      error: (err) => {
        console.error("Erro ao enviar avaliação:", err);
        alert("Erro ao enviar avaliação.");
      }
    });
  }


   getReviews() {
    this.clientService.getClientReviews(2).subscribe((reviews) => {
      this.reviews = reviews;
      
      this.reviews.forEach((review) => {
        this.establishmentService.getEstablishmentInfo(review.establishmentId).subscribe(
          (establishment) => {
            review.establishmentUsername = establishment.username; // ✅ Store username
          },
          (error) => console.error("Error fetching establishment info:", error)
        );
      });

    }, error => {
      console.error("Error fetching reviews:", error);
    });
  }

  toggleEdit() {
    // Se o formulário de adicionar saldo estiver aberto, fecha-o
    if (this.addFundMode) {
      this.addFundMode = false;
    }
    this.editMode = !this.editMode;
  }

  // Alterna o modo de adicionar saldo
  toggleAddFund() {
    // Se o modo de edição estiver aberto, fecha-o
    if (this.editMode) {
      this.editMode = false;
    }
    this.addFundMode = !this.addFundMode;
  }

  onSubmit(): void {
    if (this.updateForm.invalid) return;
    this.updating = true;
  
    this.clientService.updateUserInfo(this.updateForm.value).subscribe({
      next: (updatedUser) => {
        this.userInfo = updatedUser;
        this.editMode = false; // Fecha o modo de edição após sucesso
        this.updating = false;
      },
      error: (err) => {
        this.updateError = 'Update failed. Please try again.';
        this.updating = false;
      }
    });
  }
  

  // Inicializa o formulário para adicionar fundos
  initializeAddFundForm() {
    this.addFundForm = this.fb.group({
      balance: [null, [Validators.required, Validators.min(1)]]
    });
  }

  // Método chamado ao enviar o formulário de adicionar fundos
  onAddFundSubmit() {
    if (this.addFundForm.invalid) return;
  
    this.addingFund = true;
    this.clientService.addFund(this.addFundForm.value).subscribe({
      next: (updatedUser) => {
        window.location.reload();
        this.getBalance();
        this.cdRef.detectChanges();
        this.userInfo.balance = updatedUser.balance; // Atualiza o saldo do usuário
        this.balance = updatedUser.balance; // Atualiza a variável usada na UI
        this.addFundForm.reset();
        this.addFundMode = false; // Fecha o formulário
        this.addingFund = false;
      },
      error: (err) => {
        console.error("Erro ao adicionar fundos:", err);
        this.addFundError = "Falha ao adicionar fundos. Por favor, tente novamente.";
        this.addingFund = false;
      }
    });
  }
  }  


