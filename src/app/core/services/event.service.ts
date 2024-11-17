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
  private Url2 = `${environment.baseURL}/inscripcion`

  //constructor(private http: HttpClient) {}


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
    const registerData = localStorage.getItem('tech_auth'); // Obtén el valor como string
    const token = registerData ? JSON.parse(registerData).token : null; // Parsea el JSON y extrae el token

    if (!token) {
      throw new Error('Token no encontrado en localStorage.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<EventoResponse[]>(`${this.Url2}/usuario/${usuarioId}/evento`, { headers });
  }

}
