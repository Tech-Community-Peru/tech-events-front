import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { EventoResponse } from '../../../shared/models/evento-response.model';
import { InscriptionService } from '../../../core/service/inscription.service'; // Asegúrate de importar el servicio
import {StorageService} from '../../../core/service/storage.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, CurrencyPipe, FormsModule, NgForOf, CommonModule],
  templateUrl: './inscription-details.html',
  styleUrls: ['./inscription-details.css'],
})
export class InscriptionDetailsComponent implements OnInit {
  selectedEvent: EventoResponse | null = null;
  userRole: string | null = null;
  idParticipante: number | null = null;

  constructor(
    private router: Router, 
    private inscriptionService: InscriptionService,
    private storageService: StorageService) {}

  ngOnInit(): void {

    // Recupera los detalles del evento desde sessionStorage
    const eventData = sessionStorage.getItem('selectedEvent');
    if (eventData) {
      this.selectedEvent = JSON.parse(eventData) as EventoResponse;
    } else {
      console.error('No se encontraron datos del evento seleccionado');
      this.router.navigate(['/inscriptions']);
    }

    // Recuperar el rol del usuario desde el almacenamiento local
    const loginData = localStorage.getItem('tech_auth');
    if (loginData) {
      const user = JSON.parse(loginData);
      this.userRole = user.rol || null;
    }
  }

  goBack(): void {
    this.router.navigate(['/inscriptions']);
  }

  cancelInscripcion(eventId: number): void {
    if (!eventId) {
      console.error('El ID del evento es inválido.');
      return;
    }

    const loginData = localStorage.getItem('tech_auth');
    const participantId = loginData ? JSON.parse(loginData).idParticipante : null;

    
    this.inscriptionService.cancelInscripcion(eventId, participantId).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        alert('Tu inscripción ha sido cancelada exitosamente.');
        this.router.navigate(['/inscriptions']);
      },
      error: (error) => {
        console.error('Error al cancelar la inscripción:', error);
        alert('Hubo un problema al cancelar la inscripción. Por favor, inténtalo de nuevo más tarde.');
      },
    });
  }
}