import { Component, OnInit, inject, effect } from '@angular/core';
import { EventService, Event } from '../../core/services/event.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})



export class EventListComponent implements OnInit {
  events: Event[] = [];
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

  
  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => this.events = data,
      error: (error) => console.error('Error al cargar los eventos', error)
    });
  }

  viewEventDetails(id: number): void {
    this.router.navigate(['/events', id]);
  }
  
}
