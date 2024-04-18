import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../shared/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore: AuthStore = inject(AuthStore);
  if (authStore.isAuthenticated()) return true;
  const router = inject(Router);
  return router.createUrlTree(['/login']);
};
