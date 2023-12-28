// home.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  sortBy!: 'increment' | 'decrement';

  ngAfterViewInit(): void {
    /* this.activeRoute.queryParams.subscribe((queryObj) => {
      // = queryObj['filter'];
    }); */
  }

  sortEventHandler(filterOption: 'increment' | 'decrement') {
    this.sortBy = filterOption;
  }
}
