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

  isChildRouteActive(dropdownId: string): boolean {
    switch (dropdownId) {
      case 'managedashboard':
        return this.router.isActive('/admin/dashboard', true);
      case 'manageusers':
        return (
          this.router.isActive('/admin/users', true) ||
          this.router.isActive('/admin/users-group', true)
        );
      case 'managequestions':
        return (
          this.router.isActive('/admin/question/manage-questions', true) ||
          this.router.isActive('/admin/question/question-types', true) ||
          this.router.isActive('/admin/question/add', true) ||
          this.router.isActive('/admin/question/add-bulk', true) ||
          this.router.isActive('/admin/question/edit/:questionId', true)
        );
      case 'managecategories':
        return (
          this.router.isActive('/admin/category/manage-semesters', true) ||
          this.router.isActive('/admin/category/manage-sessions', true) ||
          this.router.isActive('/admin/category/manage-levels', true) ||
          this.router.isActive('/admin/category/manage-departments', true) ||
          this.router.isActive('/admin/category/manage-faculties', true) ||
          this.router.isActive('/admin/category/manage-courses', true)
        );
      case 'manageexams':
        return (
          this.router.isActive('/admin/exam/manage-exams', true) ||
          this.router.isActive('/admin/exam/add-exam', true) ||
          this.router.isActive('/admin/exam/edit-exam/:examId', true) ||
          this.router.isActive('/admin/exam/exam-types', true) ||
          this.router.isActive('/admin/exam/exam-results', true)
        );
      default:
        return false;
    }
  }
}
