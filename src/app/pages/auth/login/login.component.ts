import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthRequest } from '../../../shared/models/auth-request.model';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fíjate en la corrección de `styleUrls` (plural)
})
export class LoginComponent {
  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.showSnackBar('Por favor, completa los campos correctamente.');
      return;
    }

    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (authData) => {
        console.log('Datos de logeo:', authData);
        this.showSnackBar('Inicio de sesión exitoso');
        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Manejar el error del backend
        const errorMessage = err.error?.message || 'Error en el inicio de sesión. Por favor, intenta de nuevo.';
        this.showSnackBar(errorMessage);
      },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}