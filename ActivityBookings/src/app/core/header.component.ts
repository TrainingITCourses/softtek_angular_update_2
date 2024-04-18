import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

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
        <a [routerLink]="['/login']">👤 Login </a>
        <a [routerLink]="['/register']">👤 Register </a>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  title = environment.appName;
}
