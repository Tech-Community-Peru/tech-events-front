import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {EventoResponse} from '../../shared/models/evento-response.model';
import { EventService } from '../../core/service/event.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {

  selectedEvent: EventoResponse | null = null;

  constructor(
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    // Recupera los detalles del evento desde sessionStorage
    const eventData = sessionStorage.getItem('selectedEvent');
    if (eventData) {
      this.selectedEvent = JSON.parse(eventData) as EventoResponse;
      this.eventService.setSelectedEvent(this.selectedEvent); // Guardar en el servicio
    } else {
      // Si no hay datos, redirige de vuelta a la lista de eventos
      console.error('No se encontraron datos del evento seleccionado');
      this.router.navigate(['/events']);
    }
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }

  navigateToInscribirse(id: number): void {
    if (this.selectedEvent) {
      // Guarda los detalles del evento en el almacenamiento local
      sessionStorage.setItem('selectedEvent', JSON.stringify(this.selectedEvent));
      this.eventService.setSelectedEvent(this.selectedEvent);

      const loginData = localStorage.getItem('tech_auth');
      const token = loginData ? JSON.parse(loginData).token : null;



      // Redirige a la página de detalles
      this.router.navigate([`/events/:${id}/inscribirse`]);
    } else {
      console.error('Evento no encontrado');
    }
  }
}
