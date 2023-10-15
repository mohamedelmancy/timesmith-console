import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {PageTitleService} from "../../../core/page-title/page-title.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {dateFormat} from "../../variables/variables";
import {filterTable, searchInAllTableColumns} from "../../functions/shared-functions";
import {ObservablesService} from "../../../services/observables.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {debounceTime, map} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {LoaderService} from "../../../services/loader.service";
import {secureStorage} from "../../functions/secure-storage";
import moment from "moment";

@UntilDestroy()
@Component({
  selector: 'app-data-table-container',
  templateUrl: './data-table-container.component.html',
  styleUrls: ['./data-table-container.component.scss']
})
export class DataTableContainerComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('drawer2', {static: true}) drawer;
  @Input() columns;
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [10, 20, 50];
  @Input() total;
  @Input() showSearch;
  @Input() showCreate = true;
  @Input() filtersNames;
  @Input() data;
  @Input() has_excel_export;
  @Input() sort_options;
  @Input() createLink;
  @Input() viewLink;
  @Input() dataTableName;
  @Input() hasServerSearch: boolean = true;
  @Input() clearSelection: any;
  @Input() hasDelete: boolean;
  @Input() hasModify: boolean;
  @Input() hasAdd: boolean;

  //////////////////////////////////////////////////////////////////////
  @Output() fireGetServerData = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() viewPermission = new EventEmitter<any>();
  @Output() statusAction = new EventEmitter<any>();
  @Output() selectDate = new EventEmitter<any>();
  @Output() getData = new EventEmitter<any>();
  @Output() openRow = new EventEmitter<any['id']>();
  @Output() deleteData = new EventEmitter<any>();
  @Output() createRow = new EventEmitter<any>();
  //////////////////////////////////////////////////////////////////////

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  filteredData;
  rows = [];
  filterColumns = [];
  isMobile$ = this.observablesService.isMobile$.pipe(untilDestroyed(this), map(res => res));
  dashboardTables = ['dashboard customers', 'dashboard team', 'dashboard sales'];
  backup = [];
  pawStatistics;
  usersStatus;
  showCalendar = false;
  customDateRange;
  searchCtrl = new FormControl();
  loading = false;
  filtering = false;

  constructor(private pageTitleService: PageTitleService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private dialog: MatDialog,
              private observablesService?: ObservablesService,
              private loaderService?: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this), debounceTime(1000)
    ).subscribe(value => this.onFilterChange(value));
    this.subscribeToLoading();
  }

  subscribeToLoading() {
    this.loaderService.loaderState.pipe(untilDestroyed(this)).subscribe((loader) => setTimeout(() => {
      this.loading = !!loader?.show;
    }));
  }

  onFilterChange(value: string) {
    this.filtering = !!value;
    // if (!value) {
    //   // console.log('value', value)
    //   return;
    // }
    value = value.trim();
    value = value.toLowerCase();
    // this.dataSource.filter = value;
    if (this.hasServerSearch) {
      this.fireGetServerData.emit(value);
    } else {
      this.dataSource.filter = value;
    }
    // if (this.dataSource.filteredData.length === 0) {
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.dataSource = new MatTableDataSource(this.data);
    // this.dataSource.paginator = this.paginator;
    // this.backup = [...this.dataSource.data];
    if (changes['data']) {
      this.dataSource.filter = null;
      this.dataSource.data = this.data;
      this.backup = [...this.dataSource.data];
    }
    if (this.filtersNames?.includes('PAW')) {
      this.getPawStatistics();
    }
    if (this.filtersNames?.includes('status')) {
      this.getStatus();
    }
    // console.log('datatable', this.data)
    // console.log('showSearch', this.showSearch)

    if (changes['columns']) {
      this.handleColumnsSort();
    }

    if (this.clearSelection) {
      this.selection.clear();
    }
    console.log('ccc', this.columns)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  handleColumnsSort() {
    this.columns?.labels?.map((column: any) => {
      // column.hasSort = column?.label?.length && column.hasSort !== false;
    });
  }

  getPawStatistics() {
    this.pawStatistics = {
      yes: this.data.filter(x => x.PAW === 'yes')?.length,
      no: this.data.filter(x => x.PAW === 'no')?.length
    }

  }

  getStatus() {
    this.usersStatus = {
      yes: this.data.filter(x => x.status === 'active')?.length,
      no: this.data.filter(x => x.PAW === 'inActive')?.length
    }

  }

  takeAction(type, row) {
    if (type === 'Update') {
      console.log(this.viewLink)
      secureStorage.setItem('row', row);
      this.router.navigate([this.viewLink, row?.id])
    } else if (type === 'View') {
      this.viewPermission.emit(row);
    } else if (type === 'Login as') {
      window.open('https://thesmithandco.com/')
    } else if (type === 'Approve' || type === 'Deny') {
      this.statusAction.emit({row, action: type});
    } else if (type === 'Delete') {
      this.deleteEvent.emit(row);
    }
  }

  search(event: Event, type) {
    console.log('type', type)
    const searchValue = (event.target as HTMLInputElement).value;
    const lastTypeIndex = this.filterColumns.findIndex(x => x.type === type);
    console.log('filterValue', searchValue);
    this.fireGetServerData.emit({searchValue, param: type.toLowerCase()});
    const obj = {
      type: type,
      value: searchValue,
    }
    if (lastTypeIndex === -1) {
      this.filterColumns.push(obj);
    } else {
      this.filterColumns[lastTypeIndex] = obj;
    }
    this.dataSource.data = searchInAllTableColumns(this.filterColumns, this.backup);
    // console.log('filterTypes', this.filterColumns)
    // console.log('data', this.data)

    // if (filterValue && filterValue?.length > 0) {
    // this.dataSource.filterPredicate = (data, filter: string) => {
    //     // console.log('filter', filter)
    //     return (data[type]?.toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
    // };
    // this.dataSource.data = this.backup.filter(item => {
    //     for (let i = 0; i < this.filterTypes.length; i++) {
    //         var check = false;
    //         if ((item[this.filterTypes[i]?.type].toString().trim().toLowerCase()
    //             .indexOf(this.filterTypes[i]?.value.trim().toLowerCase()) !== -1)) {
    //             check =  true;
    //         } else {
    //             return  false;
    //         }
    //         if (i === this.filterTypes.length - 1) {
    //             return check
    //         }
    //     }
    //  })
    // const datas = this.dataSource.filteredData;
    // this.dataSource.data = datas;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //     this.dataSource.paginator.firstPage();
    // }
    // }
  }

  sideFilter(e) {
    this.dataSource.data = filterTable(e, this.backup);
  }


  applySelectedDate(selectedDateRange) {
    this.customDateRange = `From ${moment(selectedDateRange.start).format(dateFormat)} To  ${moment(selectedDateRange.end).format(dateFormat)}`
    this.showCalendar = false;
    this.selectDate.emit(selectedDateRange);
  }

  changePage(event) {
    console.log('paginate', event)
    // if (this.next_page !== -1) {
    this.getData.emit({...event, pageIndex: event.pageIndex + 1});
    this.selection.clear();
    // }
  }

  openDrawer() {
    if (this.isMobile$) {
      this.drawer.toggle();
    }
  }

  closeDrawer(data) {
    this.drawer.toggle();
    this.data = filterTable(data, this.backup);
  }

}
