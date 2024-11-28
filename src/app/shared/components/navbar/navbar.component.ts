import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  isAuthenticated: boolean = false;
  private router = inject(Router);

  ngOnInit(): void{
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigateByUrl('/');
  }

  back() {
    if (this.authService.getUser()?.rol === 'Ponente')
    {
      this.router.navigateByUrl('/ponente-dashboard');
    } else {
      if(this.authService.getUser()?.rol==='Participante')
      {
        this.router.navigateByUrl('/dashboard');
      }else{
        this.router.navigateByUrl('/admin-dashboard');
      }
    }
  }

  profile() {
    if(this.authService.getUser()?.rol==='Ponente')
    {
      this.router.navigateByUrl('/ponente-profile');
    }
    else{
      if(this.authService.getUser()?.rol==='Participante')
      {
        this.router.navigateByUrl('/user-profile');
      }else{
        this.router.navigateByUrl('/admin-dashboard');
      }
    }
  }
}
