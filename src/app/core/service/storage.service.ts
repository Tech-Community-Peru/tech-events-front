import {Injectable} from '@angular/core';
import {AuthResponse} from '../../shared/models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private authkey = 'bookhub_auth';
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
}
