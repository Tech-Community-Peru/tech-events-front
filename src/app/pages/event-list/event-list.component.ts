import { Component, OnInit, inject, effect } from '@angular/core';
import { EventService, Event } from '../../core/services/event.service';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {EventoResponse} from '../../shared/models/evento-response.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule, MatInputModule, RouterLink,],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})



export class EventListComponent implements OnInit {
  events: Event[] = [];
  eventos: EventoResponse[] = [];
  filteredEvents: EventoResponse[] = []; // Almacena los eventos filtrados
  selectedCategory: string = '';

  private eventService = inject(EventService);
  private router = inject(Router);
  private authService = inject(AuthService);

  isAuthenticated = this.authService.getAuthStatusSignal(); // Usa una señal para el estado de autenticación
  constructor() {
    effect(() => {
      if (!this.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  logout(): void {
    this.authService.logout(); // Cambia la señal de autenticación
  }

  filterEvents(): void {
    if(this.selectedCategory === '') {
      this.ngOnInit()
    }else{
      if (this.selectedCategory) {
        this.eventService.filterEventsByCategory(this.selectedCategory).subscribe({
          next: (data) => this.filteredEvents = data,
          error: (error) => {
            console.error('Error al filtrar los eventos', error);
            this.filteredEvents = []; // Maneja el error mostrando una lista vacía
          }
        });
      } else {
        // Si no se selecciona categoría, muestra todos los eventos
        this.filteredEvents = this.eventos;
      }
    }
  }


  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;

      },
      error: (error) => console.error('Error al cargar los eventos', error)
    });
    this.eventService.getTodosEvents().subscribe({
      next: (data) => {
        this.filteredEvents = data; // Inicialmente muestra todos los eventos

      },
      error: (error) => console.error('Error al cargar los eventos', error)
    });

  }

  viewEventDetails(id: number): void {
    const selectedEvent = this.filteredEvents.find(event => event.id === id);
    if (selectedEvent) {
      // Guarda los detalles del evento en el almacenamiento local
      sessionStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));

      // Redirige a la página de detalles
      this.router.navigate([`/events/:${id}`]);
    } else {
      console.error('Evento no encontrado');
    }
  }


}

