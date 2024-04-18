import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  inject,
  input,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ActivitiesRepository } from '../shared/activities.repository';

@Component({
  selector: 'lab-activity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, AsyncPipe],
  template: `
    <h2>Activity Id: {{ id() }}</h2>
    <!-- <pre> 1️⃣ {{ activityComputed() | async | json }}</pre> -->
    <!-- <pre> 2️⃣ {{ activityEffect() | json }}</pre> -->
    @if (activityToSignal(); as activity) {
      <small> From param to signal</small>
      <pre> {{ activity | json }}</pre>
    } @else {
      @if (errorMessage()) {
        <div>🔥{{ errorMessage() }}</div>
      } @else {
        <div>🕸️ No data yet</div>
      }
    }
    <small> From router resolver</small>
    <pre>{{ activityResolved | json }}</pre>
  `,
})
export default class ActivityPage {
  #activitiesService = inject(ActivitiesRepository);
  #route = inject(ActivatedRoute);
  // ? required?
  // ? resolver?
  id: Signal<string> = input<string>(''); // from router param
  activityResolved = this.#route.snapshot.data['activityResolved'];
  // * 0️⃣ - toSignal does not work because this.id() got with initial values
  //activity: Signal<any> = toSignal(this.#activitiesService.getById$(this.id()));

  // * 1️⃣ - computed observable
  // activityComputed: Signal<Observable<any>> = computed(() =>
  //   this.#activitiesService.getById$(this.id()),
  // );

  // * 2️⃣ - effect changing state
  // activityEffect: WritableSignal<any> = signal<any>(null);
  // #loadActivity = effect(
  //   () => {
  //     if (this.id()) {
  //       this.#activitiesService.getById$(this.id()).subscribe((a) => this.activityEffect.set(a));
  //     }
  //   },
  //   {
  //     allowSignalWrites: true,
  //   },
  // );

  // * 3️⃣ - toObservable toSignal
  // source observable
  id$: Observable<string> = toObservable(this.id);
  // target observable
  getActivity$ = (id: string) =>
    this.#activitiesService.getById$(id).pipe(
      catchError((error) => {
        this.errorMessage.set(error.message);
        return of(undefined);
      }),
    );
  activityToSignal = toSignal(this.id$.pipe(switchMap(this.getActivity$)));

  /** Error signal */
  errorMessage: WritableSignal<string | undefined> = signal(undefined);
}
