import {
  Component,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PageTitleService} from "../../../core/page-title/page-title.service";
import {GetLanguage, searchInAllTableColumns} from "../../functions/shared-functions";
import {secureStorage} from "../../functions/secure-storage";
import {DeleteComponent} from "../../../modals/delete/delete.component";
import {isMobile} from "../../variables/variables";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  dataSource: MatTableDataSource<any>;
  @Input() displayedColumns;
  @Input() pageSize = 5;
  @Input() showSearch = true;
  @Input() showCreate = true;
  @Input() sideFilters;
  @Input() data;
  @Input() createLink;
  @Input() viewLink;
  @Input() dataTableName;
  @Output() deleteEvent = new EventEmitter<any>();
  rows = [];
  filterColumns = [];
  isMobile = isMobile;
  gradeValidation = [];
  finalGrade: number;
  backup = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pageTitleService: PageTitleService, private router: Router,
              private dialog: MatDialog) {
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.backup = [...this.dataSource.data];
    console.log('data', this.data)
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    // console.log('data', this.data)
    // console.log('columns', this.displayedColumns)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  takeAction(type, row) {
    if (type === 'Update') {
      console.log(this.viewLink)
      secureStorage.setItem('row', row);
      this.router.navigate([this.viewLink, row?.id])
    } else {
      const dialogRef = this.dialog.open(DeleteComponent, {
          data: row,
          direction: GetLanguage() === 'ar' ? 'rtl' : 'ltr',
          minHeight: '50%',
          width: window.innerWidth > 1199 ? '35%' : '90%'
        }
      );
      dialogRef.afterClosed().subscribe(result => {
        console.log('res', result);
        if (result === 'yes') {
          this.deleteEvent.emit(row);
        }
      })
    }
  }

  applyFilter(event: Event, type) {
    // console.log('type', type)
    const filterValue = (event.target as HTMLInputElement).value;
    const lastTypeIndex = this.filterColumns.findIndex(x => x.type === type);
    const obj = {
      type: type,
      value: filterValue,
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
    console.log('e', e);
    let loopedArr;
    let data;
    data = this.backup.filter(item => {
      if (e.sites?.length) {
        loopedArr = e.sites;
        return this.loopOverFilter(loopedArr, item, 'site');
      } else {
        return true;
      }
    });
    data = data.filter(item => {
      if (e.departments?.length) {
        loopedArr = e.departments;
        return this.loopOverFilter(loopedArr, item, 'department');
      } else {
        return true;
      }
    });
    data = data.filter(item => {
      if (e.individuals?.length) {
        loopedArr = e.individuals;
        return this.loopOverFilter(loopedArr, item, 'employee');
      } else {
        return true;
      }
    });
    data = data.filter(item => {
      if (e.pwa) {
        loopedArr = e.sites;
        return this.loopOverFilter(loopedArr, item, 'pwa');
      } else {
        return true;
      }
    });

    if (!e.individuals?.length && !e.sites?.length && !e.departments?.length && !e.pwa) {
      data = this.backup;
    }
    this.dataSource.data = data
  }

  loopOverFilter(loopedArr, item, column): boolean {
    for (let i = 0; i < loopedArr.length; i++) {
      if (i < loopedArr.length) {
        return (item[column]?.toString().trim().toLowerCase()
            .indexOf(loopedArr[i]?.name?.trim().toLowerCase()) !== -1 ||
          item[column]?.toString().trim().toLowerCase()
            .indexOf(loopedArr[i + 1]?.name?.trim().toLowerCase()) !== -1
        );

      }
    }
  }
}
