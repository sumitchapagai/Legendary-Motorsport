import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { Store } from 'src/app/service/store';
import { Car } from 'src/app/util/internalTypes';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [Store],
})
export class StockComponent implements DoCheck {
  selectedFilter: string;

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
  @ViewChild('store') storeElement!: ElementRef;

  constructor(private store: Store) {
    this.listCount = 0;
    this.selectedFilter = 'featured';
  }

  // get data from store
  ngOnInit(): void {
    this.store.getAll(this.selectedFilter).then((data: Car[]) => {
      this.currentList = data;
      this.listCount = this.currentList.length;
      this.updateScreenWidth();
    });
  }

  filterHandler(filter: string) {
    this.selectedFilter = filter;
    this.store.getAll(this.selectedFilter).then((data: Car[]) => {
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
}
