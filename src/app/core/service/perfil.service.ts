import { inject, Injectable, signal } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';

import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';
import {ActualizarPerfilRequest} from '../../shared/models/actualizarperfil-request.model';
import {RegisterResponse} from '../../shared/models/register-response.model';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private baseURL = `${environment.baseURL}/account`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private isAuthenticatedSignal = signal(this.isAuthenticated());

  constructor() {}



  isAuthenticated(): boolean {
    return this.storageService.getRegisterData() !== null;
  }

  // Exponer la señal de autenticación como readonly
  getAuthStatusSignal() {
    return this.isAuthenticatedSignal.asReadonly();
  }

  actualizarPerfil(actualizarPerfilRequest: ActualizarPerfilRequest): Observable<string> {
    const loginData = localStorage.getItem('tech_auth');
    const token = loginData ? JSON.parse(loginData).token : null;

    if (!token) {
      console.error('Token no encontrado en localStorage.');
      throw new Error('No estás autenticado. Inicia sesión para continuar.');
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    const idParticipante = this.storageService.getAuthData()?.idParticipante;
    if (!idParticipante) {
      console.error('ID de participante no encontrado en el almacenamiento.');
      throw new Error('No se encontró el ID del participante. Verifica tu autenticación.');
    }

    const url = `${this.baseURL}/${idParticipante}`;
    console.log('Sending PUT request to:', url);


    return this.http.put<string>(url, actualizarPerfilRequest, { headers, responseType: 'text' as 'json' }).pipe(
      tap((response) => {
        console.log('Respuesta del servidor:', response);
        // Si el servidor devuelve texto, no podemos usar directamente `setRegisterData`.
        // Considera manejar la lógica dependiendo de lo que devuelva el servidor.
        this.isAuthenticatedSignal.set(true);
      }),
      catchError((error) => {
        console.error('Error al actualizar perfil:', error);
        throw error;
      })
    );
  }

}