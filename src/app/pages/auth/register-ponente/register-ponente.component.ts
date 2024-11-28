import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { AuthService } from '../../../core/service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
      CommonModule, // Add CommonModule here
      MatButtonModule,
      MatInputModule,
      MatCardModule,
      RouterLink,
      FormsModule,
      ReactiveFormsModule,
      MatSnackBarModule,
    ],
  templateUrl: './register-ponente.component.html',
  styleUrls: ['./register-ponente.component.css'],
})
export class RegisterPonenteComponent {
  registerForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cargo: ['', Validators.required],
      especialidad: ['', Validators.required],
    });
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      
      // Aquí usamos el nuevo endpoint para ponentes
      this.authService.registerPonente(userData).subscribe({
        next: (response) => {
          this.showSnackBar('Registro como ponente exitoso');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.showSnackBar('Error en el registro como ponente');
          console.error('Error en el registro de ponente:', err);
        },
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
