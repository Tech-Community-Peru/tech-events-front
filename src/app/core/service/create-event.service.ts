import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

export interface CreateEventRequest {
  nombre: string;
  costo: number;
  descripcion: string;
  eventoCategoria: string;
  tipoEvento: string;
  nombreUbicacion?: string;
  ponente?: string;
  comunidad?: string;
}

export interface CreateEventResponse {
  id: number;
  nombre: string;
  costo: number;
  descripcion: string;
  eventoCategoria: string;
  tipoEvento: string;
  nombreUbicacion?: string;
  ponente?: string;
  comunidad?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CreateEventService {
  private apiUrl = `${environment.baseURL}/eventocu`;

  constructor(private http: HttpClient) {}

  createEvent(event: CreateEventRequest): Observable<CreateEventResponse> {
    return this.http.post<CreateEventResponse>(`${this.apiUrl}/create`, event);
  }
}
