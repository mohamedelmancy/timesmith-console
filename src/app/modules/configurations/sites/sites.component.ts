import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteComponent} from "../../../modals/delete/delete.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../../services/core.service";
import {GlobalService} from "../../../services/global.service";
import {ToastrService} from "ngx-toastr";
import {GetLanguage, HandleResponseError} from "../../../shared/functions/shared-functions";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  displayedColumns = {
    labels: ['English name', 'Arabic name', 'Tolerance', 'Actions'],
    values: ['name_en', 'name_ar', 'tolerance', 'actions'],
  };

  constructor(private dialog: MatDialog,
              private coreService: CoreService,
              private globalService: GlobalService,
              private router: Router,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
  }

  tableData = [];
  paginationEvent = {
    pageIndex: 1,
    pageSize: 20,
    previousPageIndex: 0
  };
  queryParams;
  total;
  next_page;

  ngOnInit(): void {
    this.tableData = this.activatedRoute.snapshot.data['sites']?.data;
    this.tableData.forEach((item: any) => {
      item.name = GetLanguage() === 'ar' ? item?.name_ar : item?.name_en;
    })
  }

  getServerData(event?) {
    let pagination = '';
    let searchKeyword = '';
    if (event?.pageIndex) {
      this.paginationEvent = {...event}
    } else if (event) {
      searchKeyword = `&${event.param}=${event.searchValue}`;
    }
    pagination = `limit=${this.paginationEvent.pageSize}&page=${this.paginationEvent.pageIndex}`;
    this.coreService.getRequest(`console/customers_sites?${pagination}${searchKeyword}${this.queryParams ? this.queryParams : ''}`)
      .pipe(untilDestroyed(this)).subscribe(
      res => {
        this.tableData = [...res?.data];
        this.handleData();
      }, error => {
        this.toastr.error(HandleResponseError(error));
      }
    )
  }

  handleData() {
    this.tableData?.forEach((item: any) => {
      // item.main_category = item.main_categories?.name;
    });
  }

  openRow(row?: any) {
    if (row?.id) {
      this.router.navigate([`/configurations/customers/${row.id}`], {})
    } else {
      this.router.navigate(['/configurations/customers/new'], {})
    }
  }

  delete(rows) {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(DeleteComponent, {
      data: {rows: rows || '', api: 'console/customers_sites'},
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(res => {
      const ids = res?.deleted?.map(item => item.id);
      this.tableData = this.tableData.filter(x => !ids?.includes(x.id));
    })
  }

  ngOnDestroy() {
  }
}
