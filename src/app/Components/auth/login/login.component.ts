import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService , private router:Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login Successful:', response);

        // Store the full response in localStorage
        localStorage.setItem('user', JSON.stringify(response));

        // Redirect to home page
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login Failed:', error);
        alert('Login falhou. Verifique suas credenciais.');
      }
    });
  }

}
