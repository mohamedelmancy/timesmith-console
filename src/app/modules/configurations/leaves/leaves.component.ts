import {Component, OnInit} from '@angular/core';
import moment from "moment";
import {dateFormat, dateTimeFormat} from "../../../shared/variables/variables";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteComponent} from "../../../modals/delete/delete.component";

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {

  displayedColumns = {
    labels: ['Leave name', 'Type', 'Balance', 'Balance start', 'Balance end', 'Symbol', 'Actions'],
    values: ['name', 'type', 'balance', 'start', 'end', 'color', 'actions'],
  };

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
  ) {
  }

  tableData = [];
  types = [
    {
      name: 'Public Holiday',
      id: 1,
    },
    {
      name: 'Legal',
      id: 2,
    },
  ];

  ngOnInit(): void {
    this.tableData = this.activatedRoute.snapshot.data['leaves']?.data;
    this.tableData.forEach(item => {
      item.start = item.start_date ? moment(item.start_date).format(dateFormat) : '-';
      item.end = item.end_date ? moment(item.end_date).format(dateFormat) : '-';
      item.type = this.types.find(x => x.id === item?.leave_type)?.name;
    })
  }

  delete(rows) {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(DeleteComponent, {
      data: {rows: rows || '', api: 'console/customers_leaves'},
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(res => {
      const ids = res?.deleted?.map(item => item.id);
      this.tableData = this.tableData.filter(x => !ids?.includes(x.id));
    })
  }

}
