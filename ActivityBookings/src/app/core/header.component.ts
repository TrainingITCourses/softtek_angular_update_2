import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthStore } from '../shared/auth.store';

// class FakeAuthService {
//   user = 'fake';
// }
// providers:[{provide: AuthService, useClass: FakeAuthService}]

@Component({
  selector: 'lab-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe, RouterLink],
  template: `
    <header>
      <nav>
        <a [routerLink]="['/']">🏠 {{ title | uppercase }} </a>
        @if (isAnonymous()) {
          <a [routerLink]="['/login']">👤 Login </a>
          <a [routerLink]="['/register']">👤 Register </a>
        } @else {
          <span>🧑‍🦰 {{ 'user' }}</span>
        }
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  #authStore = inject(AuthStore);
  title = environment.appName;
  isAnonymous = this.#authStore.isAnonymous;
}
