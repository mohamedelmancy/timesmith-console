import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {FormBuilder} from "@angular/forms";
import {GetLanguage, HandleResponseError} from "../../shared/functions/shared-functions";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
              private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private coreService: CoreService) {

  }

  rows = [];

  ngOnInit(): void {
    this.rows = this.data?.rows;
    // if the row is object (single row)
    if (this.rows && !Array.isArray(this.rows) ) {
      this.rows = [this.rows];
    }
    this.rows?.length && this.rows?.forEach(item => item.name = GetLanguage() === 'ar' ?
      item?.name_ar || item?.title_ar || item?.text_ar || item?.question_ar || (item?.first_name + ' ' + item?.last_name) :
      item?.name_en || item?.title_en || item?.text_en || item?.question_en || (item?.first_name + ' ' + item?.last_name));
  }

  remove(item) {
    this.rows = this.rows.filter(x => x.id !== item?.id);
  }


  yes() {
    this.rows.forEach((item, index) => {
      const path = `${this.data.api}/${item?.id}`
      this.coreService.deleteRequest(path).subscribe(res => {
        if (index === (this.data?.rows?.length - 1)) {
          this.toastr.success(res?.message);
        }
      }, error => {
        this.toastr.error(HandleResponseError(error));
      }, () => {
        // console.log('in', index)
        // console.log('this.data?.rows?.length', this.rows?.length)
        if (index === (this.rows?.length - 1)) {
          this.dialogRef.close({deleted: this.rows});
        }
        // this.rows = this.rows.filter(x => x.id !== item?.id);
      })
    })

  }
}
