import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/auth.service';

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
        <a>👤 {{ user }} </a>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  #authService = inject(AuthService);

  title = environment.appName;
  user = this.#authService.user;
}
