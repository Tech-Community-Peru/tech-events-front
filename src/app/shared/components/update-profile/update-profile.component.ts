import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PerfilService} from '../../../core/service/perfil.service';
import {ActualizarPerfilRequest} from '../../models/actualizarperfil-request.model';
import {RegisterResponse} from '../../models/register-response.model';
import {StorageService} from '../../../core/service/storage.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatSnackBarModule, RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {

  updateProfileForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private perfilService = inject(PerfilService);
  private storageService = inject(StorageService);

  constructor() {
    this.updateProfileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      edad: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      habilidades: ['', [Validators.required, Validators.minLength(5)]],
      linkedin: ['', [Validators.required, Validators.pattern('https?://.+')]],
      informacionAdicional: ['', [Validators.maxLength(255)]],
      ubicacion: ['', [Validators.required, Validators.minLength(3)]],
      paisOrigen: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.updateProfileForm.invalid) {
      this.snackBar.open('Por favor, completa todos los campos requeridos.', 'Cerrar', { duration: 3000 });
      return;
    }

    const profileData: ActualizarPerfilRequest = this.updateProfileForm.value;

    this.perfilService.actualizarPerfil(profileData).subscribe({
      next: () => {
        // Recuperar los datos existentes del almacenamiento
        const existingData = this.storageService.getRegisterData();

        if (existingData) {
          // Combinar los datos existentes con los actualizados
          const updatedData: RegisterResponse = {
            ...existingData, // Mantén los campos existentes
            ...profileData,  // Sobrescribe con los datos actualizados
          };

          // Guardar los datos combinados en el almacenamiento
          this.storageService.setRegisterData(updatedData);
        }

        this.snackBar.open('Perfil actualizado exitosamente.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/userprofile']);
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err.message);
        this.snackBar.open(err.message || 'Hubo un error al actualizar el perfil.', 'Cerrar', { duration: 3000 });
      },
    });
  }


}
