import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  imports: [UpperCasePipe],
  template: `
    <header>
      <nav>
        <a>🏠 {{ title | uppercase }} </a>
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
