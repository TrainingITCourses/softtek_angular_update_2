import {
  ChangeDetectionStrategy,
  Component,
  EffectRef,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { CookiesComponent, CookiesStatus } from './cookies.component';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [CookiesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <nav>
        <span>©️ {{ getYear() }}</span>
        <span>Usuario</span>
        <span>
          <lab-cookies
            [cookiesStatus]="cookiesStatus()"
            (accept)="onAccept($event)"
            (reject)="onReject()" />
        </span>
      </nav>
    </footer>
  `,
})
export class FooterWidget {
  cookiesStatus: WritableSignal<CookiesStatus> = signal('pending');

  #saveCookiesStatus: EffectRef = effect(() => {
    console.log('save cookiesStatus', this.cookiesStatus());
  });

  getYear() {
    console.log('getYear');
    return new Date().getFullYear();
  }

  onAccept(status: CookiesStatus) {
    this.cookiesStatus.set(status);
  }
  onReject() {
    this.cookiesStatus.set('rejected');
  }
}
