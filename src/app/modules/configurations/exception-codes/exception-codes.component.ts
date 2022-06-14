import { Component, OnInit } from '@angular/core';
import moment from "moment";
import {dateFormat, dateTimeFormat} from "../../../shared/variables/variables";

@Component({
  selector: 'app-exception-codes',
  templateUrl: './exception-codes.component.html',
  styleUrls: ['./exception-codes.component.scss']
})
export class ExceptionCodesComponent implements OnInit {

  displayedColumns = {
    labels: ['Exception code', 'Symbol', 'Actions'],
    values: ['code', 'symbol', 'actions'],
  };
  constructor() { }
  data = [
    {
      code: 'Assignment',
      symbol:'fa fa-user',
      id: 1
    },{
      code: 'Meeting',
      symbol: 'fa fa-user',
      id: 2
    },
    {
      code: 'Client visit',
      symbol: 'fa fa-trash',
      id: 3
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
