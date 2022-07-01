import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  displayedColumns = {
    labels: ['Department name', 'Connected employees', 'Manager', 'Actions'],
    values: ['name', 'individuals', 'manager', 'actions'],
  };
  constructor(private activatedRoute: ActivatedRoute) { }
  data = [
    {
      name: 'Sales',
      id: 1,
      employees: [
        {
          name: 'Ali',
          id: 2
        },
      ],
      manager: 'Dahi'
    }, {
      name: 'Sales',
      id: 2,
      employees: [
        {
          name: 'Osama',
          id: 54
        },
      ],
      manager: 'Dahi'
    }, {
      name: 'Sales',
      id: 3,
      employees: [
        {
          name: 'Haidy',
          id: 12
        },
      ],
      manager: 'Dahi'
    }, {
      name: 'Marketing',
      id: 4,
      employees: [
        {
          name: 'Noha',
          id: 20
        },
      ],
      manager: 'Dahi'
    },
  ]
  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['departments'];
    this.data.forEach(item => {
        item['individuals'] = item.employees?.length;
    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }
}
