import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-view-permissions',
  templateUrl: './view-permissions.component.html',
  styleUrls: ['./view-permissions.component.scss']
})
export class ViewPermissionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewPermissionsComponent>,
              private coreService: CoreService,
              private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  ngOnInit(): void {
    console.log('data', this.data);
    // this.data?.permissions.map(item => {
    //   item.values = [];
    //   item.value.forEach(value => {
    //     console.log('ddd', Object.keys(value));
    //     item.values.push(Object.keys(value)[0]);
    //   })
    // });
    console.log('data', this.data);
  }

  yes() {
    this.dialogRef.close('yes');
  }
}
