/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ActivitiesRepository } from '../shared/activities.repository';

@Component({
  selector: 'lab-activity',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  template: `
    <h2>activity : {{ id() }}</h2>
    <!-- <pre>{{ activity() | json }}</pre> -->
    <!-- <pre>{{ activityComputed$() | async | json }}</pre> -->
    <pre>{{ activityToSignal() | json }}</pre>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActivityPage {
  #activitiesRepository = inject(ActivitiesRepository);
  id: Signal<string> = input('big bang'); // from the router params

  // activity = signal<any>({});

  // * 1️⃣ - computed observable
  // activityComputed$: Signal<Observable<any>> = computed(() =>
  //   this.#activitiesRepository.getById$(this.id()),
  // );

  // * 2️⃣ - effect changing state
  // #loadActivity = effect(
  //   () => {
  //     const activityId = this.id(); // trigger
  //     if (activityId) {
  //       this.#activitiesRepository
  //         .getById$(activityId)
  //         .subscribe((body) => this.activity.set(body));
  //     }
  //   },
  //   {
  //     allowSignalWrites: true,
  //   },
  // );

  // * 3️⃣ - toObservable toSignal
  // #id$: Observable<string> = toObservable(this.id);
  activityToSignal: Signal<any> = toSignal(
    toObservable(this.id).pipe(switchMap((id: string) => this.#activitiesRepository.getById$(id))),
    { initialValue: { id: this.id() } },
  );
}
