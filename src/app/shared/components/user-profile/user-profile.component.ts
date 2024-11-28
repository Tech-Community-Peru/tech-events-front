import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';
import {CommonModule} from '@angular/common';
import {AuthResponse} from '../../models/auth-response.model';
import {AuthService} from '../../../core/service/auth.service';
import {RegisterResponse} from '../../models/register-response.model';
import {RouterLink} from '@angular/router';
import {ActualizarPerfilResponse} from '../../models/actualizarperfil-response.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent, CommonModule, RouterLink
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  user: ActualizarPerfilResponse | null = null;

  constructor(private authresponse: AuthService) {}

  ngOnInit(): void {
    this.user = this.authresponse.getUsuarioooo(); // Obtiene los datos del usuario desde el AuthService
  }

}
