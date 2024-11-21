import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';
import {CommonModule} from '@angular/common';
import {AuthResponse} from '../../models/auth-response.model';
import {AuthService} from '../../../core/service/auth.service';
import {RegisterResponse} from '../../models/register-response.model';
import {RouterLink} from '@angular/router';

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

  user: RegisterResponse | null = null;

  constructor(private registerResponse: AuthService) {}

  ngOnInit(): void {
    this.user = this.registerResponse.getUsuario(); // Obtiene los datos del usuario desde el AuthService
  }

}
