import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgForOf} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from '../../../shared/components/navbar/navbar.component';
import {FooterComponent} from '../../../shared/components/footer/footer.component';
import {EventoResponse} from '../../../shared/models/evento-response.model';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, CurrencyPipe, FormsModule, NgForOf, CommonModule],
  templateUrl: './inscription-details.html',
  styleUrls: ['./inscription-details.css']
})
export class InscriptionDetailsComponent implements OnInit {

  selectedEvent: EventoResponse | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recupera los detalles del evento desde sessionStorage
    const eventData = sessionStorage.getItem('selectedEvent');
    if (eventData) {
      this.selectedEvent = JSON.parse(eventData) as EventoResponse;
    } else {
      // Si no hay datos, redirige de vuelta a la lista de eventos
      console.error('No se encontraron datos del evento seleccionado');
      this.router.navigate(['/inscriptions']);
    }
  }

  goBack(): void {
    this.router.navigate(['/inscriptions']);
  }

}
