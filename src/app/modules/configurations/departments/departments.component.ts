import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteComponent} from "../../../modals/delete/delete.component";
import {UntilDestroy} from "@ngneat/until-destroy";
import {GetLanguage} from "../../../shared/functions/shared-functions";

@UntilDestroy()
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  displayedColumns = {
    labels: ['English name', 'Arabic name', 'Manager', 'Actions'],
    values: ['name_en', 'name_ar', 'manager', 'actions'],
  };

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
  ) {
  }

  tableData = [
    {
      name: 'Sales',
      id: 1,
      employees: [
        {
          name: 'Ali',
          id: 2
        },
      ],
      manager: 'Dahi'
    }, {
      name: 'Sales',
      id: 2,
      employees: [
        {
          name: 'Osama',
          id: 54
        },
      ],
      manager: 'Dahi'
    }, {
      name: 'Sales',
      id: 3,
      employees: [
        {
          name: 'Haidy',
          id: 12
        },
      ],
      manager: 'Dahi'
    }, {
      name: 'Marketing',
      id: 4,
      employees: [
        {
          name: 'Noha',
          id: 20
        },
      ],
      manager: 'Dahi'
    },
  ]

  ngOnInit(): void {
    this.tableData = this.activatedRoute.snapshot.data['departments']?.data;
    this.tableData.forEach((item: any) => {
      item['individuals'] = item.employees?.length;
      item.name = GetLanguage() === 'ar' ? item?.name_ar : item?.name_en;
    })
  }

  delete(rows) {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(DeleteComponent, {
      data: {rows: rows || '', api: 'console/customers_departments'},
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(res => {
      const ids = res?.deleted?.map(item => item.id);
      this.tableData = this.tableData.filter(x => !ids?.includes(x.id));
    })
  }

}
