import {Component, inject, OnInit} from '@angular/core';
import { EventService } from '../../../core/services/event.service';
import { EventoResponse } from '../../../shared/models/evento-response.model';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {NavbarComponent} from '../../../shared/components/navbar/navbar.component';
import {FooterComponent} from '../../../shared/components/footer/footer.component';
import {Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {StorageService} from '../../../core/service/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, CurrencyPipe, FormsModule, NgForOf, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  eventos: EventoResponse[] = [];
  idParticipante: number | null = null; // Inicializamos como null hasta obtenerlo dinámicamente
  private router = inject(Router);

  constructor(
    private eventoService: EventService,
    private storageService: StorageService // Inyectamos el StorageService
  ) {}

  ngOnInit(): void {
    const authData = this.storageService.getAuthData();
    console.log('Datos de logeo:', authData); // Log para verificar los datos
    if (authData && authData.idParticipante) {
      this.idParticipante = authData.idParticipante;
      console.log('Participante ID:', this.idParticipante);
      this.loadEventos();
    } else {
      console.error('Usuario no autenticado o idParticipante ausente.');
    }
  }



  // Cargar eventos inscritos al usuario
  loadEventos(): void {
    if (!this.idParticipante) {
      console.error('No se puede cargar eventos sin un usuario autenticado.');
      return;
    }

    this.eventoService.getEventosInscritos(this.idParticipante).subscribe(
      (data) => {
        this.eventos = data;
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
        // Opcional: Mostrar mensaje de error al usuario
      }
    );
  }



  // Ver detalles del evento
  viewEventDetails(id: number): void {
    const selectedEvent = this.eventos.find(event => event.id === id);
    if (selectedEvent) {
      // Guarda los detalles del evento en el almacenamiento local
      sessionStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));

      // Redirige a la página de detalles
      this.router.navigate([`/inscriptions/:${id}`]);
    } else {
      console.error('Evento no encontrado');
    }
  }
}
