import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

export type Auth = {
  user: { id: string; email: string };
  accessToken: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  #router: Router = inject(Router);
  #initialState: Auth | undefined = undefined; // JSON.parse(local.storage.getItem(''))
  #state: WritableSignal<Auth | undefined> = signal(this.#initialState);

  #saveToStorage = effect(() => {
    const auth = this.#state();
    const authJson = JSON.stringify(auth);
    console.log('saving to storage', authJson);
  });

  #redirectAfterChange = effect(() => {
    if (this.isAnonymous()) {
      this.#router.navigate(['/login']);
    } else {
      this.#router.navigateByUrl('/');
    }
  });

  state: Signal<Auth | undefined> = this.#state.asReadonly();

  isAnonymous: Signal<boolean> = computed(() => !this.#state());

  login(auth: Auth): void {
    this.#state.set(auth);
  }

  logout() {
    this.#state.set(undefined);
  }
}
