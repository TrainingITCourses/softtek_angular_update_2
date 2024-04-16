/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesRepository {
  #httpClient = inject(HttpClient);
  #url = `${environment.apiUrl}/activities`;

  getAll$(): Observable<any[]> {
    return this.#httpClient.get<any[]>(this.#url);
  }
  getById$(id: string): Observable<any> {
    return this.#httpClient.get<any>(`${this.#url}/${id}`);
  }
}
