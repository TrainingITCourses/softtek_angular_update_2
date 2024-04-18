import { Injectable, Signal, WritableSignal, computed, effect, signal } from '@angular/core';

export type Auth = {
  user: { id: string; email: string };
  accessToken: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  #initialState = undefined; // JSON.parse(local.storage.getItem(''))
  #state: WritableSignal<Auth | undefined> = signal(this.#initialState);

  #saveToStorage = effect(() => {
    const auth = this.#state();
    const authJson = JSON.stringify(auth);
    console.log('saving to storage', authJson);
  });

  state: Signal<Auth | undefined> = this.#state.asReadonly();

  isAnonymous: Signal<boolean> = computed(() => !this.#state());

  login(auth: Auth) {
    this.#state.set(auth);
  }
}
