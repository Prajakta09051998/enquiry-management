import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private logoutTimer: any;
  private readonly TIMEOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  /**
   * Start the logout timer after user logs in
   */
  startLogoutTimer(): void {
    this.clearLogoutTimer();
    
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, this.TIMEOUT_DURATION);
  }

  /**
   * Clear the logout timer (used when user manually logs out)
   */
  private clearLogoutTimer(): void {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  /**
   * Logout the user
   */
  logout(): void {
    this.clearLogoutTimer();
    localStorage.removeItem('enquiryApp');
    this.router.navigate(['/login']);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('enquiryApp');
  }
}
