import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockComponent } from '../stock/stock.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, AfterViewInit {
  filterTypes: ['increment', 'decrement'] = ['increment', 'decrement'];
  i: 0 | 1 = 1;

  @Output() sortByEvent: EventEmitter<'increment' | 'decrement'> =
    new EventEmitter<'increment' | 'decrement'>();

  @Input('filterComponent') stockComponent!: StockComponent;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.activeRoute.url.subscribe((urlObj) => {
      if (urlObj && urlObj[0] && urlObj[0].path === 'details') {
        this.activeRoute.queryParams.subscribe((queryObj) =>
          this.stockComponent.filterHandler(queryObj['filter'])
        );
      }
    });
  }

  sortHandler() {
    this.sortByEvent.emit(this.filterTypes[++this.i % 2]);
  }
}
