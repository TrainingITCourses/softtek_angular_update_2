import {
  ChangeDetectionStrategy,
  Component,
  EffectRef,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CookiesComponent, CookiesStatus } from './cookies.component';
import { CreditsComponent } from './credits.component';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [CookiesComponent, CreditsComponent],
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
    <small>change counter: {{ changeCounter() }}</small>

    <section>
      <lab-credits [(credits)]="userCredits" />
      {{ userStars() }}
    </section>
  `,
})
export class FooterWidget {
  cookiesStatus: WritableSignal<CookiesStatus> = signal('pending');
  changeCounter = signal(0);
  userCredits = signal(3.14);

  #saveCredits = effect(() => {
    console.log('save credits', this.userCredits());
  });

  #saveCookiesStatus: EffectRef = effect(
    () => {
      if (this.cookiesStatus() === 'pending') {
        return;
      }
      this.changeCounter.update((x) => x + 1);
      console.log('save cookiesStatus', this.cookiesStatus());
    },
    { allowSignalWrites: true },
  );

  userStars = computed(() => {
    if (this.userCredits() > 10) return '⭐';
    else return '🌒';
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
