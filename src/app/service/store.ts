// store.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { car } from '../util/internalTypes';

@Injectable({
  providedIn: 'root',
})
export class Store {
  constructor(private http: HttpClient) {}

  getList(filter: string): Promise<car[]> {
    return new Promise((resolve) => {
      this.http
        .get('assets/data/car-list.json')
        .pipe(
          take(1),
          map((list: any) => list[filter] as car[])
        )
        .subscribe((data) => resolve(data));
    });
  }
}
