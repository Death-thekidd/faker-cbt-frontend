import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  loginError: string | null = null;
  loading = false;
  returnUrl!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      console.log(this.authService.currentUserValue);
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    const { email, password } = this.myForm.value;
    this.authService
      .login({ email, password })
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.loginError = error?.error?.message;
          this.messageService.add({
            severity: 'error',
            summary: 'Login Error',
            detail: this.loginError as string,
          });
        }
      );
  }

  fillForm(role: string): void {
    let email = '';
    let password = '';

    switch (role) {
      case 'admin':
        email = 'admin@test.com';
        password = 'admin-pass';
        break;
      case 'instructor':
        email = 'instructor@test.com';
        password = 'lecturer-pass';
        break;
      case 'student':
        email = 'student@test.com';
        password = 'student-pass';
        break;
    }

    this.myForm.patchValue({ email, password });
  }
}
