import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {EventoResponse} from '../../shared/models/evento-response.model';
export interface Event {
  id: number;
  nombre: string;
  costo: number;
  descripcion: string;
  eventoCategoria: string; // Categoria del evento
  tipoEvento: string; // Tipo de evento
  nombreUbicacion: string; // Nombre de la ubicación
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient); // Inyecta HttpClient directamente
  private baseURL = `${environment.baseURL}/evento`;

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseURL);
  }

  filterEventsByCategory(tipoEvento: string): Observable<Event[]> {
    const params = new HttpParams().set('tipoEvento', tipoEvento);
    return this.http.get<Event[]>(`${this.baseURL}/filtrarCategoria`, {params});
  }

  getEventDetails(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseURL}/${id}`);
  }
  getEventosInscritos(usuarioId: number): Observable<EventoResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Asegúrate de tener un token JWT almacenado
    });

    return this.http.get<EventoResponse[]>(`${this.baseURL}/${usuarioId}/evento`, { headers });
  }
}
