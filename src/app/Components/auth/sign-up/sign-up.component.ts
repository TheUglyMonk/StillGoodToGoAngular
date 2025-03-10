import { Component } from '@angular/core';
import { ClientService } from '../../../Services/client.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username = '';
  email = '';
  password = '';
  nif: number | null = null;

  constructor(private clientService: ClientService, private router: Router) {}

  registerClient() {
    if (!this.username || !this.email || !this.password || !this.nif) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    const clientData = {
      username: this.username,
      email: this.email,
      password: this.password,
      nif: this.nif
    };

    this.clientService.createClient(clientData).subscribe({
      next: (response) => {
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Client Creation Failed:', error);
        alert('Erro ao criar conta. Tente novamente.');
      }
    });
  }
}