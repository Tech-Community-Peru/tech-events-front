import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { AsistenciaService } from '../../core/service/asistencia.service'; // Importar el servicio
import { ParticipanteActivoDTO } from '../../shared/models/ParticipanteActivoDTO.model'; // Importar el DTO

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css'],
})
export class AsistenciaComponent implements OnInit {
    registerForm: FormGroup;
    statusForm: FormGroup;
    activeParticipantsForm: FormGroup;
    activeParticipants: ParticipanteActivoDTO[] = [];
  
    private fb = inject(FormBuilder);
    private snackBar = inject(MatSnackBar);
    private asistenciaService = inject(AsistenciaService);
  
    constructor() {
      // Formularios independientes
      this.registerForm = this.fb.group({
        eventId: ['', Validators.required],
        participantId: ['', Validators.required],
      });
  
      this.statusForm = this.fb.group({
        eventId: ['', Validators.required],
        participantId: ['', Validators.required],
      });
  
      this.activeParticipantsForm = this.fb.group({
        eventId: ['', Validators.required],
      });
    }
  
    ngOnInit(): void {}
  
    // Función para registrar asistencia
    onSubmit() {
      if (this.registerForm.valid) {
        const { eventId, participantId } = this.registerForm.value;
        this.asistenciaService.registerAsistencia(eventId, participantId).subscribe({
          next: (response) => this.showSnackBar('Registro de asistencia exitoso.'),
          error: (err) => this.showSnackBar('Error al registrar asistencia.'),
        });
      }
    }
  
    
    onCheckAttendanceStatus() {
        const { eventId, participantId } = this.statusForm.value;
        console.log('Valores del formulario:', this.statusForm.value);
        if (this.statusForm.valid) {
          this.asistenciaService.checkAttendanceStatus(eventId, participantId).subscribe({
            next: (status: string) => {
              console.log('Estado de asistencia recibido:', status);
              this.showSnackBar(status); // Mostrar estado recibido
            },
            error: (err: Error) => {
              console.error('Error al verificar estado:', err.message);
              this.showSnackBar('Error al verificar estado de asistencia.');
            },
          });
        } else {
          this.showSnackBar('Por favor completa los campos del formulario.');
        }
      }
      
  
    onListActiveParticipants() {
        const { eventId } = this.activeParticipantsForm.value;
      
        if (eventId) {
          this.asistenciaService.getActiveParticipants(eventId).subscribe({
            next: (participants: ParticipanteActivoDTO[]) => {
              this.activeParticipants = participants;
            },
            error: (err: Error) => {
              console.error('Error:', err.message);
              this.showSnackBar('Error al obtener participantes activos.');
            },
          });
        } else {
          this.showSnackBar('Por favor ingresa el ID del evento.');
        }
      }
      
  
    private showSnackBar(message: string): void {
      this.snackBar.open(message, 'Cerrar', { duration: 3000 });
    }
}
