import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewPermissionsComponent} from "../../../modals/view-permissions/view-permissions.component";
import {GetLanguage} from "../../../shared/functions/shared-functions";
import {MatDialog} from "@angular/material/dialog";
import {StatusActionComponent} from "../../../modals/status-action/status-action.component";

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  displayedColumns = {
    labels: ['ID', 'Employee Name', 'Site', 'Department', 'request type', 'Start date', 'End date', 'Status',  'Duration', 'Balance', 'Actions'],
    values: ['id', 'employee', 'site', 'department', 'type', 'from', 'to', 'status', 'duration', 'balance', 'statusActions']
  };
  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }
  data = [
    {
      id: 1,
      employee: 'ahmed',
      site: 'site1',
      department: 'dep1',
      type: 'timeOff',
      from: '22/10/2023',
      to: '22/10/2024',
      status: 'Pending',
      duration: '6 days',
      balance: '3'
    },
    {
      id: 2,
      employee: 'Mohamed',
      site: 'site2',
      department: 'dep2',
      type: 'Allocation',
      from: '22/10/2023',
      to: '22/10/2024',
      status: 'Approved',
      duration: '6 days',
      balance: '5'
    },

  ]
  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['requests'];
    this.data.forEach(item => {

    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }

  takeStatusAction(event) {
    console.log('status action', event)
    const dialogRef = this.dialog.open(StatusActionComponent, {
        data: event,
        direction: GetLanguage() === 'ar' ? 'rtl' : 'ltr',
        minHeight: '50%',
        width: window.innerWidth > 1199 ? '35%' : '90%'
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('res', result);
      if (result === 'yes') {
      }
    })
  }

}
