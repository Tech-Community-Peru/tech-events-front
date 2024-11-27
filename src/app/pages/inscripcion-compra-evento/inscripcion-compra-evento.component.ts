import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  private route = inject(ActivatedRoute);

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
  
        if (this.isFreeEvent) {
          // Si el evento es gratuito, omitir pasos de pago y proceder directamente
          this.purchaseService.inscribirseEvento(eventoId, tipoPago).subscribe({
            next: () => {
              alert('¡Tu inscripción al evento gratuito se realizó con éxito!'); 
              this.mensaje = '¡Tu inscripción al evento gratuito se realizó con éxito!'; 
              console.log('Inscripción completada para evento gratuito.');
            },
            error: () => {
              this.mensaje = 'Hubo un problema al inscribirte al evento gratuito. Por favor, inténtalo nuevamente.';
              console.error('Error durante la inscripción al evento gratuito.');
            },
          });
        } else {
          // Si el evento no es gratuito, continuar con el flujo de pago
          this.purchaseService.inscribirseEvento(eventoId, tipoPago).subscribe({
            next: () => {
              // Si la inscripción se realiza con éxito
              this.continuarConPago(eventoId);
            },
            error: () => {
              // Si hay un error, asumimos que existe una inscripción pendiente y continuamos
              this.mensaje = 'Se encontró una inscripción pendiente. Continuando con el proceso de pago.';
              console.warn('Error detectado, intentando continuar con el proceso de inscripción...');
              this.continuarConPago(eventoId);
            },
          });
        }
      }
    } else {
      this.mensaje = 'Por favor, completa correctamente todos los campos.';
    }
  }
  
  private continuarConPago(eventoId: number): void {
    this.purchaseService.obtenerIdInscripcion(eventoId).subscribe({
      next: (response) => {
        if (response && !isNaN(Number(response))) {
          const idInscripcion = Number(response);
          this.purchaseService.obtenerLinkPayPal(idInscripcion).subscribe({
            next: (checkoutResponse) => {
              const paypalUrl = checkoutResponse.paypalUrl;
              window.location.href = paypalUrl; // Redirigir al enlace de PayPal
            },
            error: () => {
              console.error('Error al obtener el enlace de PayPal.');
              this.mensaje = 'Hubo un problema al generar el enlace de pago, estamos recibiendo muchas consultas, por favor inténtalo nuevamente en unos minutos.';
            },
          });
        } else {
          this.mensaje = 'No se pudo obtener el ID de inscripción o el usuario no está inscrito.';
        }
      },
      error: () => {
        console.error('Error al obtener el ID de inscripción.');
        this.mensaje = 'Hubo un problema al recuperar la inscripción.';
      },
    });
  }
}