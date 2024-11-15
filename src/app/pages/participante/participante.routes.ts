import { Routes } from '@angular/router';
import {ParticipanteLayoutComponent} from './participante-layout/participante-layout.component';
import {ParticipanteHomeComponent} from './participante-home/participante-home.component';

export const participanteRoutes: Routes = [

  {
    path: '',
    component:ParticipanteLayoutComponent,
    children:[
      {
        path: 'home',
        component: ParticipanteHomeComponent
      }
    ]
  }

];
