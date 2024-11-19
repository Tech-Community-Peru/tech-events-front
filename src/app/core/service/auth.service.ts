import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';

import { StorageService } from './storage.service';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { RegisterRequest } from '../../shared/models/register-request.model';
import { RegisterResponse } from '../../shared/models/register-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  // Señal para el estado de autenticación
  private isAuthenticatedSignal = signal(this.isAuthenticated());

  constructor() {}

  // Método para el login
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(
      tap((response) => {
        this.storageService.setAuthData(response);
        this.isAuthenticatedSignal.set(true); // Cambia la señal de autenticación a true
      })
    );
  }

  // Método para el registro
  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseURL}/register/participante`, registerRequest).pipe(
      tap((response) => {
        // Almacenamos en localStorage
        this.storageService.setRegisterData(response);
        this.isAuthenticatedSignal.set(true);
      }),
      catchError((error) => {
        console.error('Error al registrar participante:', error);
        throw error;
      })
    );
  }


  // Método para el logout
  logout(): void {
    this.storageService.clearAuthData();
    this.isAuthenticatedSignal.set(false); // Cambia la señal de autenticación a false
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }

  // Exponer la señal de autenticación como readonly
  getAuthStatusSignal() {
    return this.isAuthenticatedSignal.asReadonly();
  }

  // Método para obtener el rol del usuario
  getUserRole(): string | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.rol : null;
  }

  // Método para obtener la información del usuario
  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }
}
