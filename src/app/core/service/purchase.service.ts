import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StorageService} from './storage.service';
import {catchError, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private baseURL = `${environment.baseURL}/ticket`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  inscribirseEvento(eventoId: number, tipoPago: string): Observable<string> {

    // Obtener el ID del participante
    const participanteId = this.storageService.getAuthData()?.idParticipante;
    if (!participanteId) {
      console.error('ID del participante no encontrado.');
      throw new Error(
        'No se pudo encontrar el ID del participante. Verifica tu autenticación.'
      );
    }

    // Verificar que el evento ID sea válido
    if (!eventoId) {
      console.error('ID del evento faltante.');
      throw new Error('El ID del evento no puede ser nulo.');
    }

    const url = `${this.baseURL}/purchase?eventoId=${eventoId}&participanteId=${participanteId}&tipoPago=${tipoPago}`;
    const body = { participanteId };

    // Depuración: Imprimir los datos enviados
    console.log('Enviando solicitud de inscripción:', body);

    return this.http.post<string>(url, body, {  responseType: 'text' as 'json' }).pipe(
      tap((response) => {
        console.log('Respuesta del servidor:', response);
      }),
      catchError((error) => {
        console.error('Error al inscribirse en el evento:', error);
        throw error; // Propagar el error para que el componente lo maneje
      })
    );
  }
}

