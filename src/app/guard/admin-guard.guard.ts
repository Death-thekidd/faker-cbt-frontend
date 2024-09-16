import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser?.role == 'admin') {
      // logged in so return true
      return true;
    } else if (currentUser?.role == 'lecturer') {
      this.router.navigate(['/test'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    } else if (currentUser?.role == 'student') {
      this.router.navigate(['/student/home'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    this.router.navigate(['/test'], { queryParams: { returnUrl: state.url } });
    return false;

    // not logged in so redirect to login page with the return url
  }
}
