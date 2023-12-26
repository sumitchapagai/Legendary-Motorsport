import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { Store } from 'src/app/service';
import { CarDetails } from 'src/app/util/internalTypes';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  selectedColor: string = 'black';

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
      this.store
        .getDetails(paramObj['id'])
        .then((data) => (this.carDetails = data));
    });
  }

  ngAfterViewInit(): void {
    this.activeRoute.queryParams.subscribe((queryObj) => {
      // = queryObj['filter'];
    });
  }
}
