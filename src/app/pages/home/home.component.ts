// home.component.ts

import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  sortBy!: 'increment' | 'decrement';

  sortEventHandler(filterOption: 'increment' | 'decrement') {
    this.sortBy = filterOption;
  }
}
