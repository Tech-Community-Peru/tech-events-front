import { Component, OnInit, inject } from '@angular/core';
import { EventService, Event } from '../../core/services/event.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  private eventService = inject(EventService);
  constructor() {}
  
  private router = inject(Router);
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
