import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-status-action',
  templateUrl: './status-action.component.html',
  styleUrls: ['./status-action.component.scss']
})
export class StatusActionComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<StatusActionComponent>,
              private coreService: CoreService,
              private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  ngOnInit(): void {
    console.log('data', this.data)
  }

  yes() {
    this.dialogRef.close('yes');
  }
}
