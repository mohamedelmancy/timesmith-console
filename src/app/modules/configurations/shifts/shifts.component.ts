import { Component, OnInit } from '@angular/core';
import moment from "moment";
import {dateTimeFormat} from "../../../shared/variables/variables";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  displayedColumns = {
    labels: ['Site name', 'From', 'To', 'Duration', 'Weekends', 'Employees', 'Actions'],
    values: ['name', 'from', 'to', 'duration', 'weekends', 'individuals', 'actions'],
  };
  constructor(private activatedRoute: ActivatedRoute) { }
  data = [
    {
      name: 'Shift1',
      employees: [
        {
          name: 'Noha',
          id: 20
        },
      ],
      id: 1,
      from: '2022-06-05T09:00:00Z',
      to: '2022-06-05T05:00:00Z',
      duration: 8,
      weekends: [
        {
          name: 'Saturday',
          id: 1
        },
        {
          name: 'Friday',
          id: 2
        },
      ],
      individuals: 3
    },
    {
      name: 'Shift1',
      employees: [
        {
          name: 'Noha',
          id: 20
        },
      ],
      id: 2,
      from: '2022-06-05T09:00:00Z',
      to: '2022-06-05T05:00:00Z',
      duration: 8,
      weekends: [
        {
          name: 'Saturday',
          id: 1
        },
        {
          name: 'Friday',
          id: 2
        },
      ],
      individuals: 3
    },{
      name: 'Shift1',
      employees: [
        {
          name: 'Noha',
          id: 20
        },
      ],
      id: 89,
      from: '2022-06-05T09:00:00Z',
      to: '2022-06-05T05:00:00Z',
      duration: 8,
      weekends: [
        {
          name: 'Saturday',
          id: 1
        },
        {
          name: 'Friday',
          id: 2
        },
      ],
      individuals: 3
    },{
      name: 'Shift1',
      employees: [
        {
          name: 'Noha',
          id: 20
        },
      ],
      id: 3,
      from: '2022-06-05T09:00:00Z',
      to: '2022-06-05T05:00:00Z',
      duration: 8,
      weekends: [
        {
          name: 'Saturday',
          id: 1
        },
        {
          name: 'Friday',
          id: 2
        },
      ],
      individuals: 3
    },{
      name: 'Shift1',
      employees: [
        {
          name: 'Noha',
          id: 20
        },
      ],
      id: 6,
      from: '2022-06-05T09:00:00Z',
      to: '2022-06-05T05:00:00Z',
      duration: 8,
      weekends: [
        {
          name: 'Saturday',
          id: 1
        },
        {
          name: 'Friday',
          id: 2
        },
      ],
      individuals: 3
    }




  ]
  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['shifts'];
    this.data.forEach(item => {
      item.from = moment(item.from).format('hh:mm A');
      item.to = moment(item.to).format('hh:mm A');
      item['employeesCount'] = item.employees?.length;
    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }

}
