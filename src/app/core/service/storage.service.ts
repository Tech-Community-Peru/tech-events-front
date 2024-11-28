import {Injectable} from '@angular/core';
import {AuthResponse} from '../../shared/models/auth-response.model';
import {RegisterResponse} from '../../shared/models/register-response.model';
import {ActualizarPerfilResponse} from '../../shared/models/actualizarperfil-response.model';
import {ActualizarPerfilRequest} from '../../shared/models/actualizarperfil-request.model';
import {RegisterResponsePonente} from '../../shared/models/register-responsePonente.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private authkey = 'tech_auth';
  private registerKey = 'tech_register';
  private ponenteKey = 'tech_ponente';

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
    const data = localStorage.getItem(this.authkey);
    return data? JSON.parse(data) as RegisterResponse: null;
  }

  setRegisterPonenteData(data: {
    apellido: string;
    id: number;
    paisOrigen: any;
    cargo: string;
    correoElectronico: string;
    nombre: string;
    especialidad: string;
    idPonente: number
  }): void {


      localStorage.setItem(this.ponenteKey, JSON.stringify(data));
      console.log('Datos registrados en localStorage:', data);
  }

  getRegisterPonenteData(): RegisterResponsePonente | null {
    const data = localStorage.getItem(this.ponenteKey);
    return data? JSON.parse(data) as RegisterResponsePonente: null;
  }

  setRegisterData(data: RegisterResponse): void {
    localStorage.setItem(this.registerKey, JSON.stringify(data));
    console.log('Datos registrados en localStorage:', data);
  }



  getParticipanteId(): number {
    const authData = this.getAuthData();
    if (!authData) {
      throw new Error('No authentication data found');
    }
    return authData.idParticipante || 0;
  }

  getActPerf(): AuthResponse | null {
    const data = localStorage.getItem(this.authkey);
    return data? JSON.parse(data) as AuthResponse: null;
  }

  setActPerf(data: AuthResponse): void {
    localStorage.setItem(this.authkey, JSON.stringify(data));
    console.log('Datos registrados en localStorage:', data);
  }


}
