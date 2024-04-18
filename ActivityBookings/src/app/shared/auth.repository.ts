import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, pipe } from 'rxjs';
import { environment } from '../../environments/environment';
export type Result<T> = {
  data: T;
  error: any;
};
@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  #httpClient = inject(HttpClient);
  #url = `${environment.apiUrl}`;
  #resultPipe = pipe(
    map((data) => {
      return { data, error: undefined };
    }),
    catchError((error) => {
      return of({ data: undefined, error });
    }),
  );

  postLogin$(credentials: any): Observable<Result<any>> {
    return this.#httpClient.post<any>(`${this.#url}/login`, credentials).pipe(this.#resultPipe);
  }
  postRegister$(credentials: any): Observable<any> {
    return this.#httpClient.post<any>(`${this.#url}/register`, credentials).pipe(this.#resultPipe);
  }
}
