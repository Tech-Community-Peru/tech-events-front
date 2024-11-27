import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Ruta por defecto: si no está autenticado, ir al login
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Ruta para la autenticación
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((a) => a.authRoutes),

  },


  //////////PONENTE//////////
  {
    path: 'ponente-dashboard',
    loadComponent: () =>
      import('./pages/ponente/ponente-dashboard/ponente-dashboard.component').then(
        (m) => m.PonenteDashboardComponent
      ),
    canActivate:[authGuard]
  },

  {
    path: 'ponente-profile',
    loadComponent: () =>
      import('./shared/components/ponente-profile/ponente-profile.component').then(
        (m) => m.PonenteProfileComponent
      ),
  },

  {
    path: 'ponente-profile/modificarPerfil',
    loadComponent: () =>
      import('./shared/components/update-profile-ponente/update-profile-ponente.component').then(
        (m) => m.UpdateProfilePonenteComponent
      ),
  },

  /////////////////////

  // Ruta para el dashboard después de iniciar sesión
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/participante/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
      canActivate:[authGuard]
  },




  // Rutas para eventos
  {
    path: 'events',
    loadComponent: () =>
      import('./pages/event-list/event-list.component').then(
        (m) => m.EventListComponent
      ),
  },
  {
    path: 'events/:id',
    loadComponent: () =>
      import('./pages/event-detail/event-detail.component').then(
        (m) => m.EventDetailComponent
      ),
  },
  {
    path: 'events/:id/inscribirse',
    loadComponent: () =>
      import('./pages/inscripcion-compra-evento/inscripcion-compra-evento.component').then(
        (m) => m.InscripcionCompraEventoComponent
      ),
  },
  {
    path: 'inscriptions/:id',
    loadComponent: () =>
      import('./pages/participante/inscription-details/inscription-details').then(
        (m) => m.InscriptionDetailsComponent
      ),
  },
  {
    path: 'inscriptions',
    loadComponent: () =>
      import('./pages/participante/inscription/inscription.component').then(
        (m) => m.InscriptionComponent
      ),
  },
  {
    path: 'userprofile/modificarPerfil',
    loadComponent: () =>
      import('./shared/components/update-profile/update-profile.component').then(
        (m) => m.UpdateProfileComponent
      ),
  },

  {
    path: 'user-profile',
    loadComponent: () =>
      import('./shared/components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
  },



  // Ruta por defecto para cualquier otra URL
  { path: '**', redirectTo: 'auth/login' },
];
