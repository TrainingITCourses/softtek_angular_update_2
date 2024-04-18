import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, switchMap } from 'rxjs';
import { AuthRepository, Result } from '../shared/auth.repository';
import { ResultComponent } from '../shared/result.component';

@Component({
  selector: 'lab-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResultComponent],
  template: `
    <h3>Log in</h3>
    <button (click)="loginClick$.next()">Login</button>
    <lab-result [result]="result()" />
  `,
})
export default class LoginPage {
  #authRepository: AuthRepository = inject(AuthRepository);
  credentials = {
    email: 'user@fake.com',
    password: '1234',
  };
  loginClick$ = new Subject<void>();
  #postLogin$ = () => this.#authRepository.postLogin$(this.credentials);
  result: Signal<Result<any>> = toSignal(this.loginClick$.pipe(switchMap(this.#postLogin$)), {
    initialValue: { data: undefined, error: undefined },
  });
}
