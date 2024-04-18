import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

  postLogin$(credentials: any): Observable<any> {
    return this.#httpClient.post<any>(`${this.#url}/login`, credentials);
  }
  postRegister$(credentials: any): Observable<any> {
    return this.#httpClient.post<any>(`${this.#url}/register`, credentials);
  }
}
