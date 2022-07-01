import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  displayedColumns = {
    labels: ['ID', 'Employee name', 'Site', 'Department', 'From', 'To', 'Status', 'Type', 'Duration', 'Overtime', 'Lost time'],
    values: ['id', 'employee', 'site', 'department', 'from', 'to', 'status', 'type', 'duration', 'overtime', 'lost']
  };
  constructor(private activatedRoute: ActivatedRoute) { }
  data = [

  ]
  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['reports'];
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
