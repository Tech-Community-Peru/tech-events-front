import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PerfilService} from '../../../core/service/perfil.service';
import {StorageService} from '../../../core/service/storage.service';
import {ActualizarPerfilRequest} from '../../models/actualizarperfil-request.model';
import {RegisterResponse} from '../../models/register-response.model';
import {RegisterResponsePonente} from '../../models/register-responsePonente.model';
import {ActualizarperfilRequestPonente} from '../../models/actualizarperfil-request-ponente.model';
import {AuthService} from '../../../core/service/auth.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
   imports: [
    RouterLink, CommonModule, FormsModule, ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './update-profile-ponente.component.html',
  styleUrl: './update-profile-ponente.component.css'
})
export class UpdateProfilePonenteComponent {

  updateProfileForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private perfilService = inject(PerfilService);
  private storageService = inject(StorageService);
  private authService = inject(AuthService);

  constructor() {
    this.updateProfileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      especialidad: ['', [Validators.maxLength(30)]],
      cargo: ['', [Validators.maxLength(30)]],
      paisOrigen: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.updateProfileForm.invalid) {
      this.snackBar.open('Por favor, completa todos los campos requeridos.', 'Cerrar', { duration: 3000 });
      return;
    }

    const profileData: ActualizarperfilRequestPonente = this.updateProfileForm.value;

    this.perfilService.actualizarPerfilPonente(profileData).subscribe({
      next: () => {
        // Recuperar los datos existentes del almacenamiento
        const existingData = this.storageService.getRegisterPonenteData();

        if (existingData) {
          // Combinar los datos existentes con los actualizados
          const updatedData: RegisterResponsePonente = {
            ...existingData, // Mantén los campos existentes
            ...profileData,  // Sobrescribe con los datos actualizados
          };

          // Guardar los datos combinados en el almacenamiento
          this.storageService.setRegisterPonenteData(updatedData);
        }

        this.snackBar.open('Perfil actualizado exitosamente.', 'Cerrar', { duration: 3000 });

          if(this.authService.getUser()?.rol==='Ponente')
          {
            this.router.navigateByUrl('/ponente-profile');
          }
          else{
            this.router.navigateByUrl('/auth/login');
          }},
      error: (err) => {
        console.error('Error al actualizar perfil:', err.message);
        this.snackBar.open(err.message || 'Hubo un error al actualizar el perfil.', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
