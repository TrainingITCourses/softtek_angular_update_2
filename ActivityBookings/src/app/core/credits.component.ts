/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, ModelSignal, model } from '@angular/core';

@Component({
  selector: 'lab-credits',
  standalone: true,
  template: `
    <form>
      <input type="number" [value]="credits()" (input)="onInput($event)" />
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditsComponent {
  credits: ModelSignal<number> = model.required();

  onInput(event: any) {
    const value = event.target.value;
    this.credits.set(+value);
  }
}
