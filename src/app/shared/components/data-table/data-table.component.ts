import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {PageTitleService} from "../../../core/page-title/page-title.service";
import {GetLanguage, searchInAllTableColumns} from "../../functions/shared-functions";
import {secureStorage} from "../../functions/secure-storage";
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
  @Input() data;
  rows = [];
  filterTypes = [];
  gradeValidation = [];
  finalGrade: number;
  backup = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private pageTitleService: PageTitleService, private _liveAnnouncer: LiveAnnouncer, private _Router: Router,
              private dialog: MatDialog) {
  }
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.backup = [...this.dataSource.data]
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    // console.log('data', this.data)
    // console.log('columns', this.displayedColumns)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event, type) {
    // console.log('type', type)
    const filterValue = (event.target as HTMLInputElement).value;
    const lastTypeIndex = this.filterTypes.findIndex(x => x.type === type);
    const obj = {
      type: type,
      value: filterValue,
    }
    if (lastTypeIndex === -1) {
      this.filterTypes.push(obj);
    } else {
      this.filterTypes[lastTypeIndex] = obj;
    }
    this.dataSource.data = searchInAllTableColumns(this.filterTypes, this.backup);
    // console.log('filterTypes', this.filterTypes)
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
}
