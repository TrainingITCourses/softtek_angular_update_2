import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, map, of, switchMap } from 'rxjs';
import { AuthRepository, Result } from '../shared/auth.repository';

@Component({
  selector: 'lab-register',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <h3>Register me</h3>
    <button (click)="registerClick$.next()">Register</button>
    @if (result().error; as error) {
      <pre>🔥 {{ error | json }}</pre>
    } @else {
      @if (result().data; as data) {
        <pre>✅ {{ data | json }}</pre>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPage {
  #authRepository: AuthRepository = inject(AuthRepository);
  credentials = {
    email: 'user@fake.com',
    password: '1234',
  };
  registerClick$ = new Subject<void>();
  #postRegister$ = () =>
    this.#authRepository.postRegister$(this.credentials).pipe(
      map((data) => {
        return { data, error: undefined };
      }),
      catchError((error) => {
        return of({ data: undefined, error });
      }),
    );
  result: Signal<Result<any>> = toSignal(this.registerClick$.pipe(switchMap(this.#postRegister$)), {
    initialValue: { data: undefined, error: undefined },
  });
}
