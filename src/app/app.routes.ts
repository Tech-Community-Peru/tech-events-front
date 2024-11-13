import { RouterModule, Routes } from '@angular/router';
import { UpdateProfileComponent } from './shared/components/update-profile/update-profile.component';
import { UpdateProfileroutes } from './shared/components/update-profile/update-profile.routes'

export const routes: Routes = [
    {
        path: 'update-profile',
        component: UpdateProfileComponent
    },
    ...UpdateProfileroutes,
];
