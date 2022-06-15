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
      site: 'Abbas Al Akkad',
      id: 1,
      department: 'dep1',
      shift: '8 Am to 6 PM',
      phone: '01069024844',
      manager: 'Dahi',
      connected: true,
      PAW: true,
    }
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
