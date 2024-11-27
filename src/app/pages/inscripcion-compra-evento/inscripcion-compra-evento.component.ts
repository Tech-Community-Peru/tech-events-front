import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PurchaseService } from '../../core/service/purchase.service';
import { EventoResponse } from '../../shared/models/evento-response.model';

@Component({
  selector: 'app-inscripcion-compra-evento',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './inscripcion-compra-evento.component.html',
  styleUrls: ['./inscripcion-compra-evento.component.css'],
})
export class InscripcionCompraEventoComponent implements OnInit {
  inscripcionForm: FormGroup;
  mensaje: string | null = null;
  selectedEvent: EventoResponse | null = null;
  isFreeEvent: boolean = false;  // Nueva variable para verificar si es gratuito

  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService
  ) {
    this.inscripcionForm = this.fb.group({
      tipoPago: ['DEBIT_CARD', [Validators.required]], // Validación de tipoPago
    });
  }

  ngOnInit(): void {
    // Recuperar los datos del evento seleccionado
    const eventData = sessionStorage.getItem('selectedEvent');
    if (eventData) {
      this.selectedEvent = JSON.parse(eventData) as EventoResponse;

      // Verificar si el costo del evento es 0.00
      if (this.selectedEvent?.costo === 0.00) {
        this.isFreeEvent = true;
      }
    }
  }

  onSubmit(): void {
    if (this.inscripcionForm.valid) {
      const { tipoPago } = this.inscripcionForm.value;

      if (this.selectedEvent) {
        const eventoId = this.selectedEvent.id;
        if (!eventoId) {
          this.mensaje = 'Error: No se encontró el ID del evento. Por favor, selecciona un evento válido.';
          console.error('Evento ID faltante.');
          return;
        }

        this.purchaseService.inscribirseEvento(eventoId, tipoPago).subscribe({
          next: (response) => {
            this.mensaje = `¡Inscripción exitosa! Respuesta del servidor: ${response}`;
          },
          error: (error) => {
            console.error('Error al inscribirse:', error);
            this.mensaje =
              'Hubo un problema al intentar inscribirte. Por favor, verifica los datos e intenta nuevamente.';
          },
        });
      }
    } else {
      this.mensaje = 'Por favor, completa correctamente todos los campos.';
    }
  }
}