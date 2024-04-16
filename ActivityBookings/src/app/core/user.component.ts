import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  computed,
  input,
} from '@angular/core';
import { UserStatus } from './user-status.type';

@Component({
  selector: 'lab-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span>🍪 {{ cookies() }}</span>
    <span>💲 {{ moons() }}</span>
  `,
})
export class UserComponent {
  /** Exposed Input as a required signal */
  user: InputSignal<UserStatus> = input.required<UserStatus>();

  /** Compute over input signals for presentation*/

  cookies: Signal<string> = computed(() => {
    const cookies = this.user().cookies;
    switch (cookies) {
      case 'all':
        return '💚';
      case 'essentials':
        return '🤍';
      case 'rejected':
        return '🚫';
      default:
        return '❔';
    }
  });

  moons = computed(() => {
    const credits = this.user().credit;
    if (credits > 9) return '🌕';
    if (credits > 6) return '🌔';
    if (credits > 3) return '🌓';
    if (credits > 0) return '🌒';
    return '🌑';
  });
}
