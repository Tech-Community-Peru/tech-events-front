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

  // Ruta por defecto para cualquier otra URL
  { path: '**', redirectTo: 'auth/login' },
];
