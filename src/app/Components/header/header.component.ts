import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../Models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHomePage: boolean = false;
  isUserLoggedIn: boolean = false;
  userInfo: User | null = null;
  showDropdown: boolean = false;
  
  private routerSubscription!: Subscription;
  private authSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Subscribe to router events to determine if we are on the home page.
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const authRoutes = ['/sign-in', '/sign-up'];
        this.isHomePage = !authRoutes.includes(this.router.url) && (this.router.url === '/' || this.router.url === '');
        this.cdr.detectChanges();
      }
    });

    this.authSubscription = this.authService.user.subscribe(user => {
      this.userInfo = user;
      this.isUserLoggedIn = !!user;
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    this.authService.logout();
    this.showDropdown = false;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
