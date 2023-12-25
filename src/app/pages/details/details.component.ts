import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from 'src/app/service';
import { CarDetails } from 'src/app/util/internalTypes';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  carDetails!: CarDetails;
  constructor(private store: Store, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramObj) => {
      this.store
        .getDetails(paramObj['id'])
        .then((data) => (this.carDetails = data));
    });
  }
}
