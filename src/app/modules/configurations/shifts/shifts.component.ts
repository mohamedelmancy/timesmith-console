import {Component, OnInit} from '@angular/core';
import moment from "moment";
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy} from "@ngneat/until-destroy";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteComponent} from "../../../modals/delete/delete.component";

@UntilDestroy()
@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {
  weekends = [
    {
      name: 'Saturday',
      id: 1
    },
    {
      name: 'Sunday',
      id: 2
    },
    {
      name: 'Monday',
      id: 3
    }, {
      name: 'Tuesday',
      id: 4
    }, {
      name: 'Wednesday',
      id: 5
    }, {
      name: 'Thursday',
      id: 6
    }, {
      name: 'Friday',
      id: 7
    },
  ]
  displayedColumns = {
    labels: ['English name', 'Arabic name', 'From', 'To', 'Weekends', 'Actions'],
    values: ['name_en', 'name_ar', 'from', 'to', 'weekdays', 'actions'],
  };

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
  ) {
  }

  tableData = []

  ngOnInit(): void {
    this.tableData = this.activatedRoute.snapshot.data['shifts']?.data;
    this.tableData.forEach(item => {
      if (item.from < 10) {
        item.from = `0${item?.from}`
      }
      if (item.to < 10) {
        item.to = `0${item?.to}`
      }
      item.from = `${item?.from}:00`;
      item.to = `${item?.to}:00`;
      item['employeesCount'] = item.employees?.length;
      item.weekdays = '';
      console.log('ddd', item)
      const days = item.days.split(',');
      days.map((day, index) => {
        item.weekdays += this.handleDays(this.weekends.find(x => x.id === +day)?.name);
        if (index < days?.length - 1) {
          item.weekdays += ', ';
        }
      });
    })
  }

  handleDays(day) {
    return day?.slice(0, 1).toUpperCase() + day?.slice(1, 3);
  }

  delete(rows) {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(DeleteComponent, {
      data: {rows: rows || '', api: 'console/customers_shifts'},
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(res => {
      const ids = res?.deleted?.map(item => item.id);
      this.tableData = this.tableData.filter(x => !ids?.includes(x.id));
    })
  }

}
