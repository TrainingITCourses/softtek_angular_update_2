import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, switchMap } from 'rxjs';
import { AuthRepository, Result } from '../shared/auth.repository';
import { ResultComponent } from '../shared/result.component';

@Component({
  selector: 'lab-register',
  standalone: true,
  imports: [ResultComponent],
  template: `
    <h3>Register me</h3>
    <button (click)="registerClick$.next()">Register</button>
    <lab-result [result]="result()" />
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
  #postRegister$ = () => this.#authRepository.postRegister$(this.credentials);
  result: Signal<Result<any>> = toSignal(this.registerClick$.pipe(switchMap(this.#postRegister$)), {
    initialValue: { data: undefined, error: undefined },
  });
}
