import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from 'src/app/service';
import { CarDetails } from 'src/app/util/internalTypes';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  selectedColor: string = 'black';

  sortBy!: 'increment' | 'decrement';

  statTitles = ['Top Speed', 'Acceleration', 'Braking', 'Traction'];
  @ViewChildren('statsDescription') statsDescription!: QueryList<ElementRef>;

  carDetails: CarDetails = {
    model: '',
    price: 0,
    description: '',
    conclusion: '',
    stats: {
      speed: 0,
      acceleration: 0,
      braking: 0,
      traction: 0,
    },
  };

  constructor(private store: Store, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramObj) => {
      this.store.getDetails(paramObj['id']).then((data) => {
        this.carDetails = data;
        this.updateStats(data.stats);
      });
    });
  }

  ngAfterViewInit(): void {
    this.activeRoute.queryParams.subscribe((queryObj) => {
      // = queryObj['filter'];
    });
  }

  sortEventHandler(filterOption: 'increment' | 'decrement') {
    this.sortBy = filterOption;
  }

  // ...
  updateStats(statsObj: { [index: string]: number }) {
    const titleList = ['speed', 'acceleration', 'braking', 'traction'];
    this.statsDescription.forEach((description: ElementRef, index: number) => {
      const pElement: HTMLElement = description.nativeElement;

      let n = 0;
      let first = true;

      for (let i of [1, 2, 3, 4, 5]) {
        const spana: HTMLSpanElement = pElement.querySelector(`#a${i}`)!;
        const spanb: HTMLSpanElement = spana.querySelector(`#b${i}`)!;

        const fill = statsObj[titleList[index]];
        if (first) n = fill;

        n = this.fillHelper(n, fill, spanb, 20 * i);
        first = false;
      }

      /* console.log(20 * (index + 1));
      if (fill < 20 * (index + 1)) {
        (span as HTMLSpanElement).style.backgroundColor = 'white';
      } else {
        // ...
      } */

      /*pElement;
      .querySelectorAll('.details.stats-description-details span')
        .forEach((span, index) => {
           (span as HTMLSpanElement).style.; 
        }); */
    });
  }

  fillHelper(
    n: number,
    fill: number,
    spanb: HTMLSpanElement,
    currentSpan: number
  ): number {
    if (Math.floor(fill) > currentSpan) {
      (spanb as HTMLSpanElement).style.backgroundColor = 'white';
      return n > 20 ? n - 20 : n;
    } else if (n > 0) {
      (spanb as HTMLSpanElement).style.maxWidth = n * 5 + '%';
      (spanb as HTMLSpanElement).style.backgroundColor = 'white';
      return 0;
    }
    return 0;
  }
}
