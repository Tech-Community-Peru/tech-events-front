import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../../core/service/event.service';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Incluye ReactiveFormsModule aquí
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  eventForm: FormGroup;
  evento: any;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      nombre: ['', [Validators.required]],
      costo: [0, [Validators.required]],
      descripcion: ['', [Validators.required]],
      eventoCategoria: ['BIG_DATA', [Validators.required]],
      tipoEvento: ['VIRTUAL', [Validators.required]],
      nombreUbicacion: ['', [Validators.required]],
      ponente: ['', [Validators.required]],
      comunidad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Obtener el evento seleccionado desde el servicio
    const selectedEvent = this.eventService.getSelectedEvent();
    if (selectedEvent) {
      this.evento = selectedEvent;  // Asigna el evento al componente
      this.eventForm.patchValue(selectedEvent);  // Actualiza el formulario con los valores del evento
    } else {
      console.error('Evento no encontrado');
      this.router.navigate(['/events']); // Redirige si no se encuentra un evento seleccionado
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const updatedEvent = this.eventForm.value;
      const eventId = this.evento?.id; // Asegúrate de que el ID esté presente

      if (!eventId) {
        console.error('El ID del evento no está disponible');
        return;
      }

      // Aquí, usa el ID en la URL
      this.eventService.updateEvent(eventId, updatedEvent).subscribe(
        (response) => {
          console.log('Evento actualizado:', response);
          this.router.navigate(['/eventos-admin']); // Redirigir después de actualizar
        },
        (error) => {
          console.error('Error al actualizar el evento:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  goBack(): void {
    this.router.navigate(['/eventos-admin']);
  }
}
