import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import {CreateEventComponent} from './pages/create-event/create-event.component';
import {EventEditComponent} from './pages/event-edit/event-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Autenticación
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((a) => a.authRoutes),
  },

  // Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/participante/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },

  // Eventos
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
  { path: 'create-event', component: CreateEventComponent, canActivate: [authGuard] },
  {
    path: 'edit-event/:id',
    loadComponent: () =>
      import('./pages/event-edit/event-edit.component').then(
        (m) => m.EventEditComponent
      ),
    canActivate: [authGuard],
  },





  // Inscripciones
  {
    path: 'inscriptions/:id',
    loadComponent: () =>
      import('./pages/inscription/inscription-details/inscription-details').then(
        (m) => m.InscriptionDetailsComponent
      ),
  },
  {
    path: 'inscriptions',
    loadComponent: () =>
      import('./pages/inscription/inscription.component').then(
        (m) => m.InscriptionComponent
      ),
  },

  // Perfil de usuario
  {
    path: 'userprofile/modificarPerfil',
    loadComponent: () =>
      import('./shared/components/update-profile/update-profile.component').then(
        (m) => m.UpdateProfileComponent
      ),
  },
  {
    path: 'userprofile',
    loadComponent: () =>
      import('./shared/components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
  },

  // Ruta por defecto
  { path: '**', redirectTo: 'auth/login' },
];

