import { Component, effect, inject } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-ponente-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './ponente-dashboard.component.html',
  styleUrls: ['./ponente-dashboard.component.css'],
})
export class PonenteDashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAuthenticated = this.authService.getAuthStatusSignal(); // Usa una señal para el estado de autenticación

  constructor() {
    // Efecto para observar cambios en el estado de autenticación
    effect(() => {
      if (!this.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  logout(): void {
    this.authService.logout(); // Cambia la señal de autenticación
  }
}
