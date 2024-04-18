import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../shared/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore: AuthStore = inject(AuthStore);
  const accessToken: string | undefined = authStore.accessToken();
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authStore.logout();
      }
      return throwError(() => error);
    }),
  );
};
