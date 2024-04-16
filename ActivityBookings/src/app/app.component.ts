import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterWidget } from './core/footer.widget';
import { HeaderComponent } from './core/header.component';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterWidget],
  template: `
    <lab-header />
    <router-outlet />
    <lab-footer />
  `,
  styles: [],
})
export class AppComponent {}
