import {ChangeDetectorRef, Component, OnInit, Output, ViewChild} from '@angular/core';
import {DataTableComponent} from "../data-table/data-table.component";
import {PageTitleService} from "../../../core/page-title/page-title.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {isMobile} from "../../variables/variables";
import {filterTable} from "../../functions/shared-functions";

@Component({
  selector: 'app-data-table-container',
  templateUrl: './data-table-container.component.html',
  styleUrls: ['./data-table-container.component.scss']
})
export class DataTableContainerComponent extends DataTableComponent implements OnInit {
  showFilters = false;
  @ViewChild('drawer2', {static: true}) drawer;
  constructor(private pt: PageTitleService,
              private cdr2: ChangeDetectorRef,
              private rt: Router,
              private dialog1: MatDialog) {
    super(pt, cdr2, rt, dialog1)
  }

  override ngOnInit(): void {
  }

  delete(e) {
    this.deleteEvent.emit(e);
  }

  viewPermissionFunc(e) {
    this.viewPermission.emit(e);
  }

  openDrawer() {
    if(isMobile) {
      this.drawer.toggle();
    }
  }

  closeDrawer(data) {
    this.drawer.toggle();
    this.data = filterTable(data, this.backup);
  }

}
