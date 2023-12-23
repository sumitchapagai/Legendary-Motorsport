import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from './service/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Store],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor() {}
}
