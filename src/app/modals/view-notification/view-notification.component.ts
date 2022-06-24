import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.scss']
})
export class ViewNotificationComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ViewNotificationComponent>,
              private coreService: CoreService,
              private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  ngOnInit(): void {
    console.log('data', this.data);
    this.data = {
      title: 'Update annual vacation process',
      body: 'Please check the below attachment you will find out some data may help you, also you can hit the below link to register in the new process',
      image: '../../../assets/img/avatar/timeline-screen.png',
      url: 'www.google.com'
    }
  }

  yes() {
    this.dialogRef.close('yes');
  }

}
