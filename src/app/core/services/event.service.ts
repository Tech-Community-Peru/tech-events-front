import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {EventoResponse} from '../../shared/models/evento-response.model';
import { StorageService } from '../service/storage.service';

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
 storageService = inject(StorageService);
  //constructor(private http: HttpClient) {}


  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseURL);
  }

  getTodosEvents(): Observable<EventoResponse[]> {
    return this.http.get<EventoResponse[]>(this.baseURL);
  }

  filterEventsByCategory(tipoEvento: string): Observable<EventoResponse[]> {
    const params = new HttpParams().set('tipoEvento', tipoEvento);
    const loginData = localStorage.getItem('tech_auth'); // Obtén el valor como string
    const token = loginData ? JSON.parse(loginData).token : null; // Parsea el JSON y extrae el token

    if (!token) {
      throw new Error('Token no encontrado en localStorage.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Incluye `headers` y `params` en las opciones de la solicitud
    return this.http.get<EventoResponse[]>(`${this.baseURL}/filtrarCategoria`, { headers, params });
  }


  getEventDetails(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseURL}/${id}`);
  }

  getEventosInscritos(idParticipante: number): Observable<EventoResponse[]> {
    const loginData = localStorage.getItem('tech_auth'); // Obtén el valor como string
    const token = loginData ? JSON.parse(loginData).token : null; // Parsea el JSON y extrae el token

    if (!token) {
      throw new Error('Token no encontrado en localStorage.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<EventoResponse[]>(`${this.Url2}/participante/${idParticipante}/evento`, { headers });
  }

}
