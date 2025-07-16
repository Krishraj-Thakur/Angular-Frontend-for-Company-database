import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component/dashboard.component';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/dashboard.component/dashboard.component').then(m => m.DashboardComponent)
},
];
