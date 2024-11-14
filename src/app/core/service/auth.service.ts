import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {AuthResponse} from '../../shared/models/auth-response.model';
import {Observable} from 'rxjs';
import {AuthRequest} from '../../shared/models/auth-request.model';
import {RegisterRequest} from '../../shared/models/register-request.model';
import {RegisterResponse} from '../../shared/models/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService)

  constructor() { }

  login (authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest)
      .pipe(
        tap(response => this.storageService.setAuthData (response))
    );
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.baseURL}/register/participante`, registerRequest);
  }

  logout(): void{
    this.storageService.clearAuthData();
  }

  isAuthenticated(): boolean{
    return this.storageService.getAuthData() !== null;
  }

  getUser(): AuthResponse | null{
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }

}
