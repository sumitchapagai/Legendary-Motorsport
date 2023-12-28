import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'src/app/service/store';
import { Car } from 'src/app/util/internalTypes';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [Store],
})
export class StockComponent implements DoCheck, OnChanges, AfterViewInit {
  selectedFilter: string;

  @Input() sortBy: 'increment' | 'decrement' | undefined;

  currentList!: Car[];

  // length of currentList
  listCount: number;
  /**
   *  Containes Object with keys as Home page navigation buttons
   *
   *  featured, 2 door, 4 door, motorcycles and special
   *  each object contains
   * {
   *    "id": number;
   *    "model": string;
   *    "category": string;
   *    "price": number;
   *    "seat": number;
   * }
   * */

  // Element stores the cars list (ol).
  @ViewChild('stockBorder') stockBorder!: ElementRef;

  constructor(private store: Store, private route: Router) {
    this.listCount = 0;
    this.selectedFilter = 'featured';
  }

  // get data from store
  ngOnInit(): void {
    this.filterHandler('featured');
  }

  ngAfterViewInit(): void {
    if (this.route.url === '/' || this.route.url === 'home')
      this.stockBorder.nativeElement.classList.add('stock-border');
    else this.stockBorder.nativeElement.classList.remove('stock-border');
  }

  // Responsible for getting list of items with key of the selectedFilter
  filterHandler(filter: string) {
    this.selectedFilter = filter;
    this.store.getAll(this.selectedFilter, this.sortBy).then((data: Car[]) => {
      this.currentList = data;
      this.listCount = this.currentList.length;
      this.updateScreenWidth();
    });
  }

  /**
   *  HTML ELEMENT ID = "store"
   *  Manages the background image height for main element
   */
  updateScreenWidth(): void {
    // ...
    // Dynamically adding background to construct the background Image
    /* if (this.storeElement && this.listCount) {
      console.log(this.listCount);
      (this.storeElement.nativeElement as HTMLOListElement).style.height = `${
        Math.round((this.listCount + 0.5) / 3) * 220
      }px`;
    } */
    /*  */
  }

  // Catches if data dosen't exists
  // May catch error if forgot to change listcount
  ngDoCheck(): void {
    if (
      (!this.listCount && this.currentList) ||
      (this.listCount && this.listCount !== this.currentList?.length)
    ) {
      throw new Error('Stock.component.ts ngDoCheck');
    }
  }

  // Responsible for Sorting the currentList be the sortBy
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortBy']) {
      this.filterHandler(this.selectedFilter);
    }
  }
}
