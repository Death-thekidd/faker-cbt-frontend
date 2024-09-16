import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.currentUserValue) {
      console.log(this.authService.currentUserValue);
      this.router.navigate(['/admin']); // Redirect if logged in
      return false; // Prevent access to login
    }
    return true; // Allow access to login
  }
}
