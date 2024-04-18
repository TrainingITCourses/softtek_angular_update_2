import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, map, of, switchMap } from 'rxjs';
import { AuthRepository, Result } from '../shared/auth.repository';

@Component({
  selector: 'lab-login',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <h3>Log in</h3>
    <button (click)="loginClick$.next()">Login</button>
    @if (result().error; as error) {
      <pre>🔥 {{ error | json }}</pre>
    } @else {
      @if (result().data; as data) {
        <pre>✅ {{ data | json }}</pre>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {
  #authRepository: AuthRepository = inject(AuthRepository);
  credentials = {
    email: 'user@fake.com',
    password: '1234',
  };

  loginClick$ = new Subject<void>();
  #postLogin$ = () =>
    this.#authRepository.postLogin$(this.credentials).pipe(
      map((data) => {
        return { data, error: undefined };
      }),
      catchError((error) => {
        return of({ data: undefined, error });
      }),
    );
  result: Signal<Result<any>> = toSignal(this.loginClick$.pipe(switchMap(this.#postLogin$)), {
    initialValue: { data: undefined, error: undefined },
  });
}
