import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CookiesComponent } from './cookies.component';
import { CreditsComponent } from './credits.component';
import { CookiesStatus, UserStatus } from './user-status.type';
import { UserComponent } from './user.component';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [CookiesComponent, UserComponent, CreditsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <nav>
        <span> {{ getYear() }}</span>
        <span>
          <lab-user [user]="userStatus()" (click)="openDialog.set(true)" />
        </span>
        <span><lab-credits [(credits)]="userCredits" /></span>
      </nav>
    </footer>
    <lab-cookies
      [openDialog]="openDialog()"
      (accept)="onCookiesUpdate($event)"
      (cancel)="onCookiesUpdate('rejected')" />
  `,
})
export class FooterWidget {
  /**
   * Registered effects
   * preferred over constructor
   * - reveal intention with name
   * - can be manual destroyed
   **/

  #saveCookiesStatus = effect(() => {
    console.log('saving cookies status', this.#cookiesStatus());
  });
  #updateUserCredits = effect(
    () => this.userStatus.update((state) => ({ ...state, credit: this.userCredits() })),
    {
      // ! Do not abuse (try to not propagate state changes)
      allowSignalWrites: true,
    },
  );

  /**
   * Related state
   * (for demo purposes, should be a part of userStatus)
   */

  userCredits: WritableSignal<number> = signal(0);

  /**
   * Main state as a writable signal
   */

  userStatus: WritableSignal<UserStatus> = signal<UserStatus>({
    cookies: 'pending',
    credit: this.userCredits(),
  });

  /**
   * You can compose signals as you wish
   */

  #cookiesStatus: Signal<CookiesStatus> = computed(() => this.userStatus().cookies);
  #areCookiesPending: Signal<boolean> = computed(() => this.#cookiesStatus() === 'pending');

  /**
   * Signals can be initialized from another signal
   */

  openDialog: WritableSignal<boolean> = signal(this.#areCookiesPending());

  /* Classic functions*/

  getYear() {
    return new Date().getFullYear();
  }

  onCookiesUpdate(newStatus: CookiesStatus) {
    // Set assigns a new reference by default
    this.openDialog.set(false);
    // Update wants you to return a new reference
    this.userStatus.update((state) => {
      const newState = { ...state, cookies: newStatus };
      return newState;
    });
  }
}
