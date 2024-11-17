import {Injectable} from '@angular/core';
import {AuthResponse} from '../../shared/models/auth-response.model';
import {RegisterResponse} from '../../shared/models/register-response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private authkey = 'tech_auth';
  private registerKey = 'tech_register';
  constructor() {}
  setAuthData (data: AuthResponse): void {
  localStorage.setItem(this.authkey, JSON.stringify(data));
}
  getAuthData(): AuthResponse | null {
  const data = localStorage.getItem(this.authkey);
  return data? JSON.parse(data) as AuthResponse: null;
}
  clearAuthData(): void {
  localStorage.removeItem(this.authkey);
}

  getRegisterData(): RegisterResponse | null {
    const data = localStorage.getItem(this.registerKey);
    return data? JSON.parse(data) as RegisterResponse: null;
  }

  setRegisterData (data: RegisterResponse): void {
    localStorage.setItem(this.registerKey, JSON.stringify(data));
  }

  getUsuarioId(): number | null {
    const registerData = this.getRegisterData();
    return registerData ? registerData.id: null;
  }

}
