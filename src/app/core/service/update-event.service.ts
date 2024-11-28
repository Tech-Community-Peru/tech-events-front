import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Event {
  id?: string; // Opcional si no necesitas el ID en el objeto
  name: string;
  date: string;
  location: string;
  // Agregar más propiedades según el modelo del evento
}

@Injectable({
  providedIn: 'root'
})
export class UpdateEventService {
  private apiUrl = `${environment.baseURL}/eventocu`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener un evento por ID
   * @param id ID del evento a buscar
   * @returns Observable con los datos del evento
   */
  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`);
  }

  /**
   * Actualizar un evento
   * @param eventData Datos del evento a actualizar
   * @returns Observable con la respuesta del servidor
   */
  updateEvent(eventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${eventData.id}`, eventData); // Usar el ID en la ruta
  }
}


