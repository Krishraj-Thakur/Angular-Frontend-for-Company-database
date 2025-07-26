import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component/dashboard.component';
import { DetailsComponent } from './components/details.component/details.component';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/dashboard.component/dashboard.component').then(m => m.DashboardComponent)
},{
    path: 'details/:sn',
    loadComponent: () => import('./components/details.component/details.component').then(m => m.DetailsComponent)
},
];
