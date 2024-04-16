import {
  ChangeDetectionStrategy,
  Component,
  ModelSignal,
  WritableSignal,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'lab-credits',
  standalone: true,
  template: `
    <form>
      <fieldset class="grid">
        <label for="credit">Set your credit </label>
        <input type="number" name="credit" [value]="credits()" (input)="onInput($event)" />
      </fieldset>
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditsComponent {
  /** Exposed double binding input/output [(credits)]  */
  credits: ModelSignal<number> = model.required();

  /** Local signals for local state */
  openDialog: WritableSignal<boolean> = signal(false);

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    // model signals propagate changes to parent like an output does
    this.credits.set(+value);
  }
}
