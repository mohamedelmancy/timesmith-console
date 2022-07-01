import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.scss']
})
export class IndividualsComponent implements OnInit {
  displayedColumns = {
    labels: ['ID', 'Name', 'Site', 'Department', 'Shift', 'Mobile number', 'Manager',  'Connected', 'Punch anywhere', 'Role', 'Actions'],
    values: ['id', 'name', 'site', 'department', 'shift', 'phone', 'manager', 'connected', 'PAW', 'role', 'actions'],
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
      connected: 'yes',
      PAW: 'yes',
      roleObj: {
        name: 'SuperAdmin',
        id: 3
      },
    },
    {
      name: 'team2',
      siteObj: {
        name: 'Site2',
        id: 1
      },
      id: 2,
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
      connected: 'no',
      PAW: 'no',
      roleObj: {
        name: 'Admin',
        id: 3
      },
    },
    {
      name: 'team3',
      siteObj: {
        name: 'Site4',
        id: 1
      },
      id: 3,
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
      connected: 'no',
      PAW: 'no',
      roleObj: {
        name: 'Manager',
        id: 3
      },
    },
  ]
  viewedConfigurationRowId;
  viewedConfigurationName;
  ngOnInit(): void {
    console.log('activatedRoute', this.activatedRoute.snapshot);
    this.viewedConfigurationRowId = this.activatedRoute.snapshot.queryParams['id'];
    this.viewedConfigurationName = this.activatedRoute.snapshot.fragment;
    // this.data = this.activatedRoute.snapshot.data['sites'];
    this.data.forEach(item => {
      item['site'] = item.siteObj.name;
      item['department'] = item.departmentObj.name;
      item['shift'] = item.shiftObj.name;
      item['role'] = item.roleObj.name;
    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }

}
