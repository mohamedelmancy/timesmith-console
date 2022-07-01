import { Component, OnInit } from '@angular/core';
import moment from "moment";
import {dateFormat, dateTimeFormat} from "../../../../shared/variables/variables";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  displayedColumns = {
    labels: ['Department', 'Site', 'Employee ID', 'Employee name', 'Check In', 'Check Out', 'Duration', 'Status'],
    values: ['department', 'site', 'id', 'name', 'check_in', 'check_out', 'duration', 'status'],
  };
  constructor() { }
  data = [
    {
      department: 'Marketing',
      site: 'XYZ',
      id: 1,
      name: 'Mohamed Salah',
      check_in: '2022-06-05T09:00:00Z',
      check_out: '2022-06-05T05:00:00Z',
      duration: 'MMMM',
      status: 'Ok'
    },
    {
      department: 'Sales',
      site: 'TTY',
      id: 2,
      name: 'Ibrahim Salah',
      check_in: '2022-06-05T10:00:00Z',
      check_out: '2022-06-05T06:00:00Z',
      duration: 'DDD',
      status: 'NO'
    },
  ]
  ngOnInit(): void {
    this.data.forEach(item => {
      item.check_in = moment(item.check_in).format(dateTimeFormat);
      item.check_out = moment(item.check_out).format(dateTimeFormat);
    })
  }

}
