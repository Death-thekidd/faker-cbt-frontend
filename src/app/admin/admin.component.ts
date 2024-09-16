import { Component, OnInit, SimpleChange } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

declare function init(): void;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  pageTitle?: string = this.titleService.getTitle();
  isAdmin: boolean = false;
  isInstructor: boolean = false;
  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pageTitle = this.titleService.getTitle().split('|')[0];
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.pageTitle = this.titleService.getTitle().split('|')[0];
      });
    const role = this?.authService?.currentUserValue?.role;
    this.isAdmin = role === 'admin';
    this.isInstructor = role === 'instructor';
  }

  ngAfterViewInit(): void {
    init();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
