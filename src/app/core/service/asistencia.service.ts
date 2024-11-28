import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment'; // Asegúrate de la ruta correcta
import { ParticipanteActivoDTO } from '../../shared/models/ParticipanteActivoDTO.model'; // Asegúrate de la ruta correcta

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private baseUrl = `${environment.baseURL}/qrcode`; // Usa la baseURL del environment

  constructor(private http: HttpClient) {}

  registerAsistencia(eventId: number, participantId: number): Observable<any> {
    const url = `${this.baseUrl}/generate/${eventId}/${participantId}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  checkAttendanceStatus(eventId: number, participantId: number): Observable<string> {
    const url = `${environment.baseURL}/asistencia/estado/${eventId}/${participantId}`;
    return this.http.get<string>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al verificar estado:', error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }
  

  getActiveParticipants(eventId: number): Observable<ParticipanteActivoDTO[]> {
    const url = `${environment.baseURL}/asistencia/activos/${eventId}`;
    return this.http.get<ParticipanteActivoDTO[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener participantes activos:', error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }
  
}
