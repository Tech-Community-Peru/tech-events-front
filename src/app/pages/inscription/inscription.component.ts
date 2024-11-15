import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { EventoResponse } from '../../shared/models/evento-response.model';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, CurrencyPipe, FormsModule, NgForOf],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  eventos: EventoResponse[] = [];
  usuarioId: number = 1; // Asume que el id del usuario es conocido

  constructor(private eventoService: EventService) { }

  ngOnInit(): void {
    this.loadEventos();
  }

  // Cargar eventos inscritos al usuario
  loadEventos(): void {
    this.eventoService.getEventosInscritos(this.usuarioId).subscribe(
      (data) => {
        this.eventos = data;
      },
      (error) => {
        console.error('Error al obtener eventos', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }

  // Ver detalles del evento
  viewEventDetails(eventId: number): void {
    console.log('Ver detalles del evento con ID:', eventId);
    // Aquí puedes hacer algo con los detalles del evento, como navegar a otra página o abrir un modal
  }

  // Método para mostrar la lógica del filtro si es necesario en el futuro
  filterEventsByCategory(tipoEvento: string): void {
    // Lógica de filtrado por categoría, si se implementa en el futuro
  }
}
