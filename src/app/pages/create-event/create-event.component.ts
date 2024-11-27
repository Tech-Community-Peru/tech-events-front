import {Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEventService, CreateEventRequest } from '../../core/service/create-event.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  imports: [RouterLink, CommonModule,ReactiveFormsModule  ],
})
export class CreateEventComponent {

  createEventForm: FormGroup;

  categories = [
    'BIG_DATA', 'CIBERSEGURIDAD', 'MACHINE_LEARNING', 'INTELIGENCIA_ARTIFICIAL',
    'CLOUD', 'DEVOPS', 'INNOVACION', 'BLOCKCHAIN',
  ];
  eventTypes = ['VIRTUAL', 'PRESENCIAL'];

  constructor(
    private fb: FormBuilder,
    private createEventService: CreateEventService,
    private router: Router
  ) {
    this.createEventForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      costo: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      eventoCategoria: ['', Validators.required],
      tipoEvento: ['', Validators.required],
      nombreUbicacion: [''],
      ponente: [''],
      comunidad: [''],
    });
  }


  onSubmit(): void {
    if (this.createEventForm.valid) {
      const formValue: CreateEventRequest = this.createEventForm.value;
      this.createEventService.createEvent(formValue).subscribe({
        next: () => {
          alert('Evento creado exitosamente');
          this.router.navigate(['/event-list']);
        },
        error: (err) => {
          console.error('Error al crear el evento', err);
          alert('Hubo un error al crear el evento');
        },
      });
    }
  }
}
