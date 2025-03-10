import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  isLoggedIn = false;  // Track the login state

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login Successful:', response);

        // Store the full response in localStorage
        localStorage.setItem('user', JSON.stringify(response));

        // Redirect based on role
        if (response.role === 1) {
          this.router.navigate(['/']).then(() => {
            window.location.reload(); // Force a reload after navigation
          });
        } else if (response.role === 0) {
          this.router.navigate(['/manager']).then(() => {
            window.location.reload(); // Force a reload after navigation
          });
        } else if (response.role === 2) {
          this.router.navigate(['/establishment']).then(() => {
            window.location.reload(); // Force a reload after navigation
          });
        }
      },
      error: (error) => {
        console.error('Login Failed:', error);
        alert('Login falhou. Verifique suas credenciais.');
      }
    });
  }
}