import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header.component';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <lab-header />
    <h1>Welcome to Modern Angular!</h1>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
