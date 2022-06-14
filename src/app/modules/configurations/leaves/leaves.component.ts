import { Component, OnInit } from '@angular/core';
import moment from "moment";
import {dateFormat, dateTimeFormat} from "../../../shared/variables/variables";

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {

  displayedColumns = {
    labels: ['Leave name', 'Type', 'Balance', 'Balance start', 'Balance end', 'Symbol', 'Actions'],
    values: ['name', 'type', 'balance', 'start', 'end', 'symbol', 'actions'],
  };
  constructor() { }
  data = [
    {
      name: 'Sick leave',
      type: 'Legal',
      balance: 2,
      end: '2022-06-09',
      start: '2022-06-07',
      symbol: '#ff1122',
      id: 1
    },{
      name: 'Permission',
      type: 'Legal',
      balance: 12,
      end: '2022-06-09',
      start: '2022-06-07',
      symbol: '#669f28',
      id: 1
    },
    {
      name: 'Maternity',
      type: 'Public Holiday',
      balance: 2,
      end: '2022-06-09',
      start: '2022-06-07',
      symbol: '#1e3cad',
      id: 2
    },{
      name: 'Annual',
      type: 'Legal',
      balance: 2,
      end: '2022-06-09',
      start: '2022-06-07',
      symbol: '#dea413',
      id: 3
    },{
      name: 'Casual',
      type: 'Legal',
      balance: 2,
      end: '2022-06-09',
      start: '2022-06-07',
      symbol: '#9f0c7c',
      id: 4
    },{
      name: 'Easter',
      type: 'Public Holiday',
      balance: 2,
      end: '2022-06-09',
      start: '2022-06-07',
      symbol: '#2da449',
      id: 5
    }
  ]
  ngOnInit(): void {
    this.data.forEach(item => {
      item.start = moment(item.start).format(dateFormat);
      item.end = moment(item.end).format(dateFormat);
    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }

}
