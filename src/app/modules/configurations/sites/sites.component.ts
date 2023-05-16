import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteComponent} from "../../../modals/delete/delete.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../../services/core.service";
import {GlobalService} from "../../../services/global.service";
import {ToastrService} from "ngx-toastr";
import {HandleResponseError} from "../../../shared/functions/shared-functions";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  displayedColumns = {
    labels: ['Site name', 'Latitude', 'Longitude', 'Tolerance', 'Individuals', 'Actions'],
    values: ['name', 'latitude', 'longitude', 'tolerance', 'individuals', 'actions'],
  };

  constructor(private dialog: MatDialog,
              private coreService: CoreService,
              private globalService: GlobalService,
              private router: Router,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
  }

  tableData = [
    {
      name: 'Abbas el Akkad',
      latitude: 29.98833754091559,
      id: 1,
      longitude: 31.127786800599356,
      tolerance: 10,
      individuals: 3
    }, {
      name: 'Al nozha Al Gdida',
      latitude: 30.11479588,
      id: 2,
      longitude: 30.99874557,
      tolerance: 18,
      individuals: 5
    }, {
      name: 'Sues',
      latitude: 30.7444778,
      id: 3,
      longitude: 30.99688854,
      tolerance: 20,
      individuals: 9
    }, {
      name: 'fifth settlement',
      latitude: 30.125547851,
      id: 4,
      longitude: 30.33214478,
      tolerance: 12,
      individuals: 5
    },
  ];
  paginationEvent = {
    pageIndex: 1,
    pageSize: 20,
    previousPageIndex: 0
  };
  queryParams;
  total;
  next_page;

  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['sites'];
    this.tableData.forEach(item => {

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
    this.coreService.getRequest(`admin/customers?${pagination}${searchKeyword}${this.queryParams ? this.queryParams : ''}`)
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
      this.router.navigate([`/customers/${row.id}`], {})
    } else {
      this.router.navigate(['/customers/new'], {})
    }
  }

  delete(rows) {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(DeleteComponent, {
      data: {rows: rows || '', api: 'admin/customers'},
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
