/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { ActivitiesRepository } from '../shared/activities.repository';

@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, RouterLink],
  template: `
    <article>
      <header>My activities</header>
      <main>
        @for (activity of activities(); track activity.id) {
          <div>
            <a [routerLink]="activity.id">{{ activity.name }}</a>
          </div>
        } @empty {
          @if (error()) {
            <div>🔥{{ error() | json }}</div>
          } @else {
            <div>🕸️ No data yet</div>
          }
        }
      </main>
      <footer>Got {{ activitiesCount() }} activities</footer>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  #activitiesRepository = inject(ActivitiesRepository);
  // * 1️⃣ - classic imperative
  // activities: any[] = [];
  // error: string = '';

  // * 2️⃣ - classic reactive
  activities$: Observable<any[]> = this.#activitiesRepository.getAll$().pipe(
    catchError((error) => {
      //this.error = error;
      this.error.set(error);
      throw error;
    }),
  );

  // * 3️⃣ - signals imperative
  // activities: WritableSignal<any[]> = signal([]);
  error: WritableSignal<string> = signal('');

  // * 4️⃣ - signals imperative
  activities: Signal<any[]> = toSignal(this.activities$, { initialValue: [] });
  activitiesCount: Signal<number> = computed(() => this.activities().length);

  constructor() {
    // * 1️⃣ - classic imperative
    // this.getAll$().subscribe({
    //   next: (body) => (this.activities = body),
    //   error: (error) => (this.error = error),
    // });
    // * 3️⃣ - signals imperative
    // this.getAll$().subscribe({
    //   next: (body) => this.activities.set(body),
    //   error: (error) => this.error.set(error),
    // });
  }
}
