import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent  {
  isLoggedIn = false;
  dropdownVisible = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn = this.authService.isLoggedIn(); // Use your AuthService to check login status
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  logout(): void {
    // Perform logout logic, clear localStorage or call a logout API
    localStorage.removeItem('user');
    this.isLoggedIn = false; // Update login status
    // Optionally, you can redirect the user to a different page after logging out
  }
}