import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventoResponse } from '../../shared/models/evento-response.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private selectedEventSubject = new BehaviorSubject<EventoResponse | null>(null);
  selectedEvent$ = this.selectedEventSubject.asObservable();

  setSelectedEvent(event: EventoResponse): void {
    this.selectedEventSubject.next(event);
  }

  getSelectedEvent(): EventoResponse | null {
    return this.selectedEventSubject.getValue();
  }
}