import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { activityResolver } from './routes/activity.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home.page'),
    //component: HomePage,
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login.page'),
  },
  {
    path: 'register',
    loadComponent: () => import('./routes/register.page'),
  },
  {
    path: ':id',
    canActivate: [authGuard],
    resolve: {
      activityResolved: activityResolver,
    },
    loadComponent: () => import('./routes/activity.page'),
  },
];
