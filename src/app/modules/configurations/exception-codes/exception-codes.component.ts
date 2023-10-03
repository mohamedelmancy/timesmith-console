import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GetLanguage} from "../../../shared/functions/shared-functions";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteComponent} from "../../../modals/delete/delete.component";

@Component({
  selector: 'app-exception-codes',
  templateUrl: './exception-codes.component.html',
  styleUrls: ['./exception-codes.component.scss']
})
export class ExceptionCodesComponent implements OnInit {

  displayedColumns = {
    labels: ['English name', 'Arabic name', 'Symbol', 'Actions'],
    values: ['name_en', 'name_ar', 'symbol', 'actions'],
  };

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
  ) {
  }

  tableData = [];
  language = GetLanguage();

  ngOnInit(): void {
    this.tableData = this.activatedRoute.snapshot.data['exceptionCodes']?.data;
    this.tableData.forEach(item => {
      item.symbol = item?.icon;
    });
    console.log('s', this.tableData)
  }

  delete(rows) {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(DeleteComponent, {
      data: {rows: rows || '', api: 'console/exceptions_codes'},
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(res => {
      const ids = res?.deleted?.map(item => item.id);
      this.tableData = this.tableData.filter(x => !ids?.includes(x.id));
    })
  }

}
