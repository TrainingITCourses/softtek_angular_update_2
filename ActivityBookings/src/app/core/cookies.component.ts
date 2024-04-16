import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  OutputEmitterRef,
  input,
  output,
} from '@angular/core';

export type Acceptance = 'essentials' | 'all';

@Component({
  selector: 'lab-cookies',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog [open]="openDialog()">
      <article>
        <header>
          <h2>We use cookies</h2>
          <p>To ensure you get the best experience on our website.</p>
        </header>
        <section>
          <p>To be compliant with the EU GDPR law, we need your consent to set the cookies.</p>
        </section>
        <footer>
          <button class="contrast outline" (click)="onButtonsClick()">Cancel</button>
          <button class="secondary outline" (click)="onButtonsClick('essentials')">
            Essentials
          </button>
          <button class="primary outline" (click)="onButtonsClick('all')">Accept all</button>
        </footer>
      </article>
    </dialog>
  `,
})
export class CookiesComponent {
  /** Exposed Input as a not required signal (must have an initial state)*/
  openDialog: InputSignal<boolean> = input(false);

  /** Exposed Output event (signal-like syntax) */
  cancel: OutputEmitterRef<void> = output();
  /** Exposed Output event with argument (signal-like syntax) */
  accept: OutputEmitterRef<Acceptance> = output<Acceptance>();

  onButtonsClick(acceptance?: Acceptance) {
    // Events are emitted not set
    if (acceptance) this.accept.emit(acceptance);
    else this.cancel.emit();
  }
}
