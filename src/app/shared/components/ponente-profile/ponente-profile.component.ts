import {Component, OnInit} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {RegisterResponse} from '../../models/register-response.model';
import {AuthService} from '../../../core/service/auth.service';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {RegisterResponsePonente} from '../../models/register-responsePonente.model';
import {ActualizarPerfilResponse} from '../../models/actualizarperfil-response.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent, CommonModule, RouterLink
  ],
  templateUrl: './ponente-profile.component.html',
  styleUrl: './ponente-profile.component.css'
})
export class PonenteProfileComponent implements OnInit {
  user: ActualizarPerfilResponse | null = null;

  constructor(private registerPonenteResponse: AuthService) {}

  ngOnInit(): void {
    this.user = this.registerPonenteResponse.getPonenteee(); // Obtiene los datos del usuario desde el AuthService
  }
}
