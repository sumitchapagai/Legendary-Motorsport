// store.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { Car, CarDetails } from '../util/internalTypes';

@Injectable({
  providedIn: 'root',
})
export class Store {
  constructor(private http: HttpClient) {}

  getAll(filter: string): Promise<Car[]> {
    return new Promise((resolve) => {
      this.http
        .get('assets/data/car-list.json')
        .pipe(
          take(1),
          map((list: any) => list[filter] as Car[])
        )
        .subscribe((data) => resolve(data));
    });
  }

  getDetails(id: string): Promise<CarDetails> {
    return new Promise((resolve) => {
      this.http
        .get('assets/data/car-details.json')
        .pipe(
          take(1),
          map((list: any) => list[id] as CarDetails)
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
}
