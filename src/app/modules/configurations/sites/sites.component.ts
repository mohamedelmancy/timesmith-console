import { Component, OnInit } from '@angular/core';
import moment from "moment";
import {dateTimeFormat} from "../../../shared/variables/variables";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  displayedColumns = {
    labels: ['Site name', 'Latitude', 'Longitude', 'Tolerance', 'Individuals', 'Actions'],
    values: ['name', 'latitude', 'longitude', 'tolerance', 'individuals', 'actions'],
  };
  constructor(private activatedRoute: ActivatedRoute) { }
  data = [
    {
      name: 'Abbas el Akkad',
      latitude: 29.98833754091559,
      id: 1,
      longitude: 31.127786800599356,
      tolerance: 10,
      individuals: 3
    }, {
      name: 'Al nozha Al Gdida',
      latitude: 30.11479588,
      id: 2,
      longitude: 30.99874557,
      tolerance: 18,
      individuals: 5
    }, {
      name: 'Sues',
      latitude: 30.7444778,
      id: 3,
      longitude: 30.99688854,
      tolerance: 20,
      individuals: 9
    }, {
      name: 'fifth settlement',
      latitude: 30.125547851,
      id: 4,
      longitude: 30.33214478,
      tolerance: 12,
      individuals: 5
    },
  ]
  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['sites'];
    this.data.forEach(item => {

    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }

}
