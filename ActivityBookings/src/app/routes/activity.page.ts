import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-activity',
  standalone: true,
  imports: [],
  template: ` <p>activity works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActivityPage {}
