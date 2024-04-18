import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Result } from './auth.repository';

@Component({
  selector: 'lab-result',
  standalone: true,
  imports: [JsonPipe],
  template: `
    @if (result().error; as error) {
      <pre>🔥 {{ error | json }}</pre>
    } @else {
      @if (result().data; as data) {
        <pre>✅ {{ data | json }}</pre>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  result: InputSignal<Result<any>> = input.required();
}
