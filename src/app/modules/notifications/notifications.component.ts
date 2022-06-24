import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {GetLanguage} from "../../shared/functions/shared-functions";
import {MatDialog} from "@angular/material/dialog";
import {ViewNotificationComponent} from "../../modals/view-notification/view-notification.component";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  displayedColumns = {
    labels: ['Title', 'Date', 'Time', 'Sender', 'Mode', 'Actions'],
    values: ['title', 'date', 'time', 'senderName', 'mode', 'view']
  };
  constructor(private activatedRoute: ActivatedRoute, private translateService: TranslateService, private dialog: MatDialog) { }
  data = [
    {
      date: '22/10/2025',
      time: '02:25',
      senderName: 'Alaa',
      title: 'notification 1',
      mode: 'site',
      id: 1
    },
    {
      date: '22/10/2025',
      time: '02:25',
      senderName: 'Alaa',
      title: 'notification 1',
      mode: 'department',
      id: 2
    },
    {
      date: '22/10/2025',
      time: '02:25',
      senderName: 'Alaa',
      title: 'notification 1',
      mode: 'employees',
      id: 3
    },
  ]
  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['reports'];
    this.data.forEach(item => {
      item.mode =  `${this.translateService.instant('by')} ${item.mode}`
    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }

  viewPermission(event) {
    console.log('viewPermission', event)
    const dialogRef = this.dialog.open(ViewNotificationComponent, {
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
