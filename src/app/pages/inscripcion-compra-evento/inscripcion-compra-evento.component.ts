import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PerfilService} from '../../core/service/perfil.service';
import {PurchaseService} from '../../core/service/purchase.service';
import {EventoResponse} from '../../shared/models/evento-response.model';
import {AuthService} from '../../core/service/auth.service';

@Component({
  selector: 'app-inscripcion-compra-evento',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './inscripcion-compra-evento.component.html',
  styleUrl: './inscripcion-compra-evento.component.css'
})
export class InscripcionCompraEventoComponent {
  inscripcionForm: FormGroup;
  mensaje: string | null = null;
  selectedEvent: EventoResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService
  ) {
    this.inscripcionForm = this.fb.group({
      tipoPago: ['DEBIT_CARD', [Validators.required]], // Validación de tipoPago
    });
  }

  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.inscripcionForm.valid) {
      const { tipoPago } = this.inscripcionForm.value;

      // Recuperar los datos del evento seleccionado
      const eventData = sessionStorage.getItem('selectedEvent');
      if (eventData) {
        this.selectedEvent = JSON.parse(eventData) as EventoResponse;
      }

      // Verificar que exista el eventoId antes de continuar
      const eventoId = this.selectedEvent?.id;
      if (!eventoId) {
        this.mensaje = 'Error: No se encontró el ID del evento. Por favor, selecciona un evento válido.';
        console.error('Evento ID faltante.');
        return;
      }

      // Llamar al servicio para inscribirse en el evento
      this.purchaseService.inscribirseEvento(eventoId, tipoPago).subscribe({
        next: (response) => {
          this.mensaje = `¡Inscripción exitosa! Respuesta del servidor: ${response}`;
        },
        error: (error) => {
          console.error('Error al inscribirse:', error);
          // Mostrar un mensaje de error amigable para el usuario
          this.mensaje =
            'Hubo un problema al intentar inscribirte. Por favor, verifica los datos e intenta nuevamente.';
        },
      });
    } else {
      this.mensaje = 'Por favor, completa correctamente todos los campos.';
    }
  }
}
