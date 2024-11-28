import { Component, OnInit, inject, effect } from '@angular/core';
import { EventService, Event } from '../../core/services/event.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EventoResponse } from '../../shared/models/evento-response.model';
import { PurchaseService } from '../../core/service/purchase.service';

// Importar los enums
import { CategoryEvent } from '../../shared/models/categoryEvent.model';
import { TypeEvent } from '../../shared/models/typeEvent.model'; // Importar el enum TypeEvent

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  eventos: EventoResponse[] = [];
  filteredEvents: EventoResponse[] = []; // Eventos filtrados
  selectedCategory: string = ''; // Categoría seleccionada para filtrar
  searchTerm: string = ''; // Término de búsqueda desde el input

  private eventService = inject(EventService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private purchaseService = inject(PurchaseService);
  private route = inject(ActivatedRoute);

  isAuthenticated = this.authService.getAuthStatusSignal();

  constructor() {
    effect(() => {
      if (!this.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  // Método para transformar eventos de tipo Event a EventoResponse
  transformToEventoResponse(events: Event[]): EventoResponse[] {
    return events.map(event => ({
      id: event.id,
      nombre: event.nombre,
      descripcion: event.descripcion,
      costo: event.costo,
      eventoCategoria: this.transformCategory(event.eventoCategoria),
      tipoEvento: this.transformTypeEvent(event.tipoEvento),
    }));
  }

  // Función para transformar la categoría a CategoryEvent
  transformCategory(category: string): CategoryEvent {
    if (Object.values(CategoryEvent).includes(category as CategoryEvent)) {
      return category as CategoryEvent;
    } else {
      throw new Error('Categoría de evento inválida');
    }
  }

  // Función para transformar el tipo de evento a TypeEvent
  transformTypeEvent(type: string): TypeEvent {
    if (Object.values(TypeEvent).includes(type as TypeEvent)) {
      return type as TypeEvent;
    } else {
      throw new Error('Tipo de evento inválido');
    }
  }

  // Función para filtrar los eventos por categoría
  filterEventsByCategory(): void {
    let filtered = this.eventos;

    // Filtrar por categoría
    if (this.selectedCategory !== '') {
      filtered = filtered.filter(event => event.eventoCategoria === this.selectedCategory);
    }

    // Aplicar la búsqueda si es que existe
    this.filteredEvents = this.applySearch(filtered);
  }

  // Función para realizar la búsqueda de eventos por nombre o descripción
  searchEvents(): void {
    // Filtramos los eventos de acuerdo con el término de búsqueda
    this.filteredEvents = this.applySearch(this.eventos);
  }

  // Aplicamos búsqueda sobre los eventos
  private applySearch(events: EventoResponse[]): EventoResponse[] {
    const searchTermLower = this.searchTerm.toLowerCase();

    // Si hay término de búsqueda, filtrar los eventos
    if (this.searchTerm !== '') {
      return events.filter(event =>
        event.nombre.toLowerCase().includes(searchTermLower) ||
        event.descripcion.toLowerCase().includes(searchTermLower)
      );
    }

    // Si no hay término de búsqueda, devolver todos los eventos
    return events;
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      console.log('Token recibido desde la URL:', token);
      this.capturePayment(token);
    }

    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.eventos = this.transformToEventoResponse(data); // Transformamos los eventos
        this.filteredEvents = [...this.eventos]; // Inicialmente mostramos todos los eventos
      },
      error: (error) => console.error('Error al cargar los eventos', error)
    });
  }

  viewEventDetails(id: number): void {
    const selectedEvent = this.filteredEvents.find(event => event.id === id);
    if (selectedEvent) {
      sessionStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
      this.router.navigate([`/events/:${id}`]);
    } else {
      console.error('Evento no encontrado');
    }
  }

  private capturePayment(token: string): void {
    this.purchaseService.capturePaypalOrder(token).subscribe({
      next: (response) => {
        console.log('Respuesta de captura de pago:', response);
        if (response.completed) {
          alert('Tu inscripción y compra se ha realizado con éxito.');
        } else {
          console.warn('El pago no fue completado.');
        }
      },
      error: (error) => {
        console.error('Error al capturar el pago:', error);
      },
    });
  }

  back() {
    if (this.authService.getUser()?.rol === 'Ponente') {
      this.router.navigateByUrl('/ponente-dashboard');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}