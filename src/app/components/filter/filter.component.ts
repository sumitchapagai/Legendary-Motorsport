import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockComponent } from '../stock/stock.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, AfterViewInit {
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
}
