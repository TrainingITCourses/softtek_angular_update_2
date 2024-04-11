import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  OutputEmitterRef,
  Signal,
  computed,
  input,
  output,
} from '@angular/core';

export type CookiesStatus = 'pending' | 'rejected' | 'essentials' | 'all';
export type Acceptance = 'essentials' | 'all';

@Component({
  selector: 'lab-cookies',
  standalone: true,
  imports: [],
  template: `
    {{ cookiesMessage() }}
    @if (!acceptedCookies()) {
      <button class="contrast outline" (click)="reject.emit()">Reject Cookies</button>
      <button class="primary outline" (click)="accept.emit('essentials')">Essentials</button>
      <button class="primary outline" (click)="accept.emit('all')">Accept All</button>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiesComponent {
  cookiesStatus: InputSignal<CookiesStatus> = input.required();

  acceptedCookies: Signal<boolean> = computed(() =>
    ['essentials', 'all'].includes(this.cookiesStatus()),
  );

  cookiesMessage: Signal<string> = computed(() => {
    if (this.cookiesStatus() === 'all') return '💚';
    else if (this.cookiesStatus() === 'essentials') {
      return '🤍';
    } else if (this.cookiesStatus() === 'rejected') {
      return '🖤';
    } else {
      return '❔';
    }
  });

  accept: OutputEmitterRef<Acceptance> = output();
  reject: OutputEmitterRef<void> = output();
}
