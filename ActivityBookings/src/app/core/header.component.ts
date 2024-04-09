import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';

// class FakeAuthService {
//   user = 'fake';
// }

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

  title = 'Activity Bookings';
  user = this.#authService.user;
}
