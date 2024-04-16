import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home.page'),
    //component: HomePage,
  },
  {
    path: ':id',
    loadComponent: () => import('./routes/activity.page'),
  },
];
