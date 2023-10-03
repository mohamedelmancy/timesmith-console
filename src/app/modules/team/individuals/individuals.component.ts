import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteComponent} from "../../../modals/delete/delete.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.scss']
})
export class IndividualsComponent implements OnInit {
  displayedColumns = {
    labels: ['ID', 'Name', 'Site', 'Department', 'Shift', 'Manager', 'Mobile number', 'Auto Punch', 'Connected', 'Punch anywhere', 'Actions'],
    values: ['id', 'name', 'site', 'department', 'shift', 'manager', 'full_mobile_number', 'auto_punch', 'connected', 'PAW', 'actions'],
  };

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private translateService: TranslateService,
  ) {
  }

  tableData = []
  viewedConfigurationRowId;
  viewedConfigurationName;

  ngOnInit(): void {
    this.viewedConfigurationRowId = this.activatedRoute.snapshot.queryParams['id'];
    this.viewedConfigurationName = this.activatedRoute.snapshot.fragment;
    this.tableData = this.activatedRoute.snapshot.data['individuals']?.data;
    this.tableData.forEach(item => {
      item['site'] = item.site?.name;
      item['manager'] = item.manager?.name;
      item['department'] = item.department?.name;
      item['shift'] = item.shift?.name;
      item['organization'] = item.organization?.name;
      item['connected'] = (item.is_connected === 1) ? this.translateService.instant('Yes') : this.translateService.instant('No');
      item['PAW'] = (item.punch_anywhere === 1) ? this.translateService.instant('Yes') : this.translateService.instant('No');
      item['auto_punch'] = (item.auto_punch === 1) ? this.translateService.instant('Yes') : this.translateService.instant('No');
    });
    console.log('s', this.tableData)

  }

  delete(rows) {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(DeleteComponent, {
      data: {rows: rows || '', api: 'users'},
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(res => {
      const ids = res?.deleted?.map(item => item.id);
      this.tableData = this.tableData.filter(x => !ids?.includes(x.id));
    })
  }
}
