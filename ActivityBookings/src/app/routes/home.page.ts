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
import { Observable, catchError, of } from 'rxjs';
import { ActivitiesRepository } from '../shared/activities.repository';

@Component({
  selector: 'lab-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <article>
      <header>My home page</header>
      <main>
        @for (activity of activities(); track activity.id) {
          <div>
            <span>
              <a [routerLink]="['/', activity.id]">{{ activity.name }} </a>
            </span>
            <span>📌 {{ activity.location }} </span>
          </div>
        } @empty {
          @if (errorMessage()) {
            <div>🔥{{ errorMessage() }}</div>
          } @else {
            <div>🕸️ No data yet</div>
          }
        }
      </main>
      <footer>
        Got <mark>{{ activitiesCount() }}</mark> activities
      </footer>
    </article>
  `,
})
export default class HomePage {
  #activitiesRepository = inject(ActivitiesRepository);
  /** Observable with error handling to be used with | async or with toSignal() */
  activities$: Observable<any[]> = this.#activitiesRepository.getAll$().pipe(
    catchError((error) => {
      // this.errorMessage = error;
      this.errorMessage.set(error.message);
      return of([]);
    }),
  );

  // * 1️⃣ - classic imperative
  // activities: any[] = [];
  // constructor() {
  //   this.#activitiesRepository.getAll$().subscribe({
  //     next: (body) => (this.activities = body),
  //     error: (error) => (this.errorMessage = error),
  //   });
  // }
  // @for (activity of activities; track activity.id) {
  // @if (errorMessage) {
  //   <small>{{ errorMessage }}</small>
  // }

  // * 2️⃣ - classic reactive with | async
  // @for (activity of (activities$ | async); track activity.id) {

  // * 3️⃣ - signal imperative
  // activities: WritableSignal<any[]> = signal([]);
  // constructor() {
  //   this.#activitiesRepository.getAll$().subscribe({
  //     next: (body) => (this.activities.set(body)),
  //     error: (error) => (this.errorMessage.set(error)),
  //   });
  // }
  // @for (activity of activities(); track activity.id) {

  // * 4️⃣ - signal reactive
  activities: Signal<any[]> = toSignal(this.activities$, { initialValue: [] });

  /** Counter Computed signal */
  activitiesCount: Signal<number> = computed(() => this.activities().length);
  /** Error signal */
  errorMessage: WritableSignal<string | undefined> = signal(undefined);
}
