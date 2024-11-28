import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../../core/service/event.service';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
})
export class EventEditComponent implements OnInit {
  eventForm: FormGroup;
  evento: any;

  // Opciones disponibles para los campos tipo enum
  categories = [
    'BIG_DATA', 'CIBERSEGURIDAD', 'MACHINE_LEARNING', 'INTELIGENCIA_ARTIFICIAL',
    'CLOUD', 'DEVOPS', 'INNOVACION', 'BLOCKCHAIN',
  ];
  eventTypes = ['VIRTUAL', 'PRESENCIAL'];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      costo: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      eventoCategoria: ['', Validators.required], // Corresponde a categoryEvent
      tipoEvento: ['', Validators.required], // Corresponde a typeEvent

    });
  }

  ngOnInit(): void {
    const selectedEvent = this.eventService.getSelectedEvent();
    if (selectedEvent) {
      this.evento = selectedEvent; // Asigna el evento al componente
      this.eventForm.patchValue(selectedEvent); // Rellena el formulario con los datos del evento
    } else {
      console.error('Evento no encontrado');
      this.router.navigate(['/eventos-admin']); // Redirige si no se encuentra un evento seleccionado
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const updatedEvent = this.eventForm.value;
      const eventId = this.evento?.id;

      if (!eventId) {
        console.error('El ID del evento no está disponible');
        alert('Error: No se puede modificar el evento sin un ID válido');
        return;
      }

      this.eventService.updateEvent(eventId, updatedEvent).subscribe({
        next: (response) => {
          console.log('Evento actualizado:', response);
          alert('Evento actualizado exitosamente');
          this.router.navigate(['/eventos-admin']); // Redirigir después de actualizar
        },
        error: (err) => {
          console.error('Error al actualizar el evento:', err);
          alert('Hubo un error al actualizar el evento. Por favor, intenta nuevamente.');
        },
      });
    } else {
      console.error('Formulario inválido');
      alert('El formulario contiene errores. Por favor, revisa los campos.');
    }
  }

  goBack(): void {
    this.router.navigate(['/eventos-admin']);
  }
}
