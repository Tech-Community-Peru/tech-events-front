import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { EventoResponse } from '../../shared/models/evento-response.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${environment.baseURL}/eventocu`;

  constructor(private http: HttpClient) {}
  private selectedEventSubject = new BehaviorSubject<EventoResponse | null>(null);
  selectedEvent$ = this.selectedEventSubject.asObservable();

  setSelectedEvent(event: EventoResponse): void {
    this.selectedEventSubject.next(event);
  }

  getSelectedEvent(): EventoResponse | null {
    return this.selectedEventSubject.getValue();
  }
  updateEvent(id: string, event: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, event);
  }
}
