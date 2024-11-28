import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private baseUrl = `${environment.baseURL}/inscripcion`;

  constructor(private http: HttpClient) {}

  cancelInscripcion(eventId: number, participantId: number): Observable<string> {
    const url = `${this.baseUrl}/cancelar/${eventId}/${participantId}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}