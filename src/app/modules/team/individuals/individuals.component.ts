import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.scss']
})
export class IndividualsComponent implements OnInit {
  displayedColumns = {
    labels: ['ID', 'Name', 'Site', 'Department', 'Shift', 'Mobile number', 'Manager',  'Connected', 'Punch any way', 'Actions'],
    values: ['id', 'name', 'site', 'department', 'shift', 'phone', 'manager', 'connected', 'PAW', 'actions'],
  };
  constructor(private activatedRoute: ActivatedRoute) { }
  data = [
    {
      name: 'team1',
      siteObj: {
        name: 'Abbas Al Akkad',
        id: 1
      },
      id: 1,
      departmentObj: {
        name: 'marketing',
        id: 2
      },
      shiftObj: {
        name: '8 Am to 6 PM',
        id: 3
      },
      phone: '01069024844',
      manager: 'Dahi',
      connected: true,
      PAW: true,
    },
    {
      name: 'team2',
      siteObj: {
        name: 'Site2',
        id: 1
      },
      id: 1,
      departmentObj: {
        name: 'sales',
        id: 2
      },
      shiftObj: {
        name: '8 Am to 7 PM',
        id: 3
      },
      phone: '01069088844',
      manager: 'Salman',
      connected: false,
      PAW: false,
    },
    {
      name: 'team3',
      siteObj: {
        name: 'Site4',
        id: 1
      },
      id: 1,
      departmentObj: {
        name: 'sales',
        id: 2
      },
      shiftObj: {
        name: '8 Am to 9 PM',
        id: 3
      },
      phone: '01069089944',
      manager: 'Yosef',
      connected: false,
      PAW: false,
    },
  ]
  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['sites'];
    this.data.forEach(item => {
      item['site'] = item.siteObj.name;
      item['department'] = item.departmentObj.name;
      item['shift'] = item.shiftObj.name;
    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }

}
