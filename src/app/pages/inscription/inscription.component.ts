import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { EventoResponse } from '../../shared/models/evento-response.model';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {StorageService} from '../../core/service/storage.service';
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
  usuarioId: number | null = null; // Inicializamos como null hasta obtenerlo dinámicamente

  constructor(
    private eventoService: EventService,
    private storageService: StorageService // Inyectamos el StorageService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.storageService.getUsuarioId();
    console.log('Usuario ID:', this.usuarioId); // Log para verificar el valor
    if (this.usuarioId) {
      this.loadEventos(); // Si existe usuarioId, cargamos los eventos
    } else {
      console.error('Usuario no autenticado.');
      // Opcional: Redirigir al login o mostrar un mensaje de error
    }
  }


  // Cargar eventos inscritos al usuario
  loadEventos(): void {
    if (!this.usuarioId) {
      console.error('No se puede cargar eventos sin un usuario autenticado.');
      return;
    }

    this.eventoService.getEventosInscritos(this.usuarioId).subscribe(
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
  viewEventDetails(eventId: number): void {
    console.log('Ver detalles del evento con ID:', eventId);
    // Lógica para manejar detalles del evento (modal, navegación, etc.)
  }

  // Método para filtrar eventos por categoría
  filterEventsByCategory(tipoEvento: string): void {
    // Lógica para filtrar eventos si se implementa
  }
}
