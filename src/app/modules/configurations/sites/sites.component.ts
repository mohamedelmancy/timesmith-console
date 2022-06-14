import { Component, OnInit } from '@angular/core';
import moment from "moment";
import {dateTimeFormat} from "../../../shared/variables/variables";

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
  constructor() { }
  data = [
    {
      name: 'Abbas el Akkad',
      latitude: 2.55878754,
      id: 1,
      longitude: 2.44878754,
      tolerance: 10,
      individuals: 3
    }, {
      name: 'Al nozha Al Gdida',
      latitude: 2.11479588,
      id: 2,
      longitude: 2.99874557,
      tolerance: 18,
      individuals: 5
    }, {
      name: 'Sues',
      latitude: 2.7444778,
      id: 3,
      longitude: 2.99688854,
      tolerance: 20,
      individuals: 9
    }, {
      name: 'fifth settlement',
      latitude: 2.125547851,
      id: 4,
      longitude: 2.33214478,
      tolerance: 12,
      individuals: 5
    },
  ]
  ngOnInit(): void {
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
