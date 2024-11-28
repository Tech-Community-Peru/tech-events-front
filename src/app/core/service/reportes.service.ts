import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Asegúrate de la ruta correcta

export interface RegistroEscaneoDTO {
  id: number;
  participanteId: number;
  participanteNombre: string;
  fechaEscaneo: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private baseUrl = `${environment.baseURL}/estadisticas`; // Usa la baseURL del environment

  constructor(private http: HttpClient) {}

  obtenerTotalEscaneosPorEvento(eventoId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/eventos/${eventoId}/total-escaneos`);
  }

  obtenerTotalEscaneosPorParticipante(participanteId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/participantes/${participanteId}/total-escaneos`);
  }

  obtenerEscaneosPorEvento(eventoId: number): Observable<RegistroEscaneoDTO[]> {
    return this.http.get<RegistroEscaneoDTO[]>(`${this.baseUrl}/eventos/${eventoId}/escaneos`);
  }
}
