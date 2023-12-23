import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { Observable, find, map, take } from 'rxjs';
import { Store } from 'src/app/service/store';

type car = {
  id: number;
  model: string;
  category: string;
  price: number;
  seat: number;
};

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [Store],
})
export class StockComponent implements DoCheck {
  selectedFilter: string;
  currentList: car[] | undefined;

  // length of carList$
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

  carList$!: Observable<{
    [index: string]: car[];
  }>;
  // Element stores the cars list (ol).
  @ViewChild('store') storeElement!: ElementRef;

  constructor(private store: Store) {
    this.listCount = 0;
    this.selectedFilter = 'featured';
  }

  // get data from store
  ngOnInit(): void {
    this.carList$ = this.store.getList();
    this.carList$.pipe(take(1)).subscribe((list) => {
      this.listCount = list['featured'].length;
      this.currentList = list[this.selectedFilter];
      this.updateScreenWidth();
    });
  }

  updateCurrentList(filter: string) {
    console.log(this.currentList![0].id);
    this.selectedFilter = filter;
    this.carList$
      .pipe(
        take(1),
        map((list) => list[this.selectedFilter])
      )
      .subscribe((filteredItem) => {
        this.currentList = filteredItem;
        console.log(this.currentList);
        this.updateScreenWidth();
      });
  }

  /**
   *  HTML ELEMENT ID = "store"
   *
   */
  updateScreenWidth(): void {
    // Dynamically adding background to construct the background Image
    if (this.storeElement && this.listCount)
      (this.storeElement.nativeElement as HTMLOListElement).style.height = `${
        Math.round((this.listCount + 0.5) / 3) * 210
      }px`;
  }

  ngDoCheck(): void {
    if (!this.listCount && this.currentList) {
      throw new Error('Something went wrong.');
    }
  }
}
