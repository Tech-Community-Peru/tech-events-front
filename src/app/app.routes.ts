import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path:'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((a) => a.authRoutes)
  },

  {
    path:'participante',
    loadChildren: () =>
      import('./pages/participante/participante.routes').then((p) => p.participanteRoutes)
  }

];
