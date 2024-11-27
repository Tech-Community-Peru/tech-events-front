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

  obtenerIdInscripcion(eventoId: number): Observable<number> {
    const participanteId = this.storageService.getAuthData()?.idParticipante;
    if (!participanteId) {
      throw new Error('No se encontró el ID del participante.');
    }
  
    const url = `${environment.baseURL}/inscripcion/evento/${eventoId}/participante/${participanteId}`;
    return this.http.get<number>(url).pipe(
      tap((response) => {
        if (isNaN(Number(response))) {
          console.error('Respuesta inesperada:', response);
          throw new Error('La respuesta no es un ID válido.');
        }
      }),
      catchError((error) => {
        console.error('Error al obtener ID de inscripción:', error);
        throw error;
      })
    );
  }
  
  obtenerLinkPayPal(inscriptionId: number): Observable<{ paypalUrl: string }> {
    const url = `${environment.baseURL}/checkout/create?inscriptionId=${inscriptionId}&returnUrl=${environment.paypalReturnUrl}&cancelUrl=${environment.paypalReturnUrl}`;
  
    return this.http.post<{ paypalUrl: string }>(url, {}).pipe(
      tap((response) => console.log('Enlace de PayPal generado:', response)),
      catchError((error) => {
        console.error('Error al generar el enlace de PayPal:', error);
        throw error;
      })
    );
  }

  capturePaypalOrder(orderId: string): Observable<{ completed: boolean; inscriptionId: number }> {
    const url = `${environment.baseURL}/checkout/capture?orderId=${orderId}`;
    
    return this.http.post<{ completed: boolean; inscriptionId: number }>(url, {}).pipe(
      tap((response) => {
        if (!response.completed) {
          console.error('La captura del pago no se completó:', response);
          throw new Error('El pago no fue completado correctamente.');
        }
        console.log('Pago capturado exitosamente:', response);
      }),
      catchError((error) => {
        console.error('Error al capturar el pago:', error);
        throw error;
      })
    );
  }
  
}

