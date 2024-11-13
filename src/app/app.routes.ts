import { RouterModule, Routes } from '@angular/router';
import { PonenteProfileComponent } from './shared/components/ponente-profile/ponente-profile.component';
import { PonenteProfileRoutes } from './shared/components/ponente-profile/ponente-profile.routes'

export const routes: Routes = [
    {
        path: '',
        component: PonenteProfileComponent
    },
    ...PonenteProfileRoutes,
];
