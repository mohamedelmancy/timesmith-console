import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {DataTableComponent} from "../data-table/data-table.component";
import {PageTitleService} from "../../../core/page-title/page-title.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {isMobile} from "../../variables/variables";

@Component({
  selector: 'app-data-table-container',
  templateUrl: './data-table-container.component.html',
  styleUrls: ['./data-table-container.component.scss']
})
export class DataTableContainerComponent extends DataTableComponent implements OnInit {
  showFilters = false;
  @ViewChild('drawer2', {static: true}) filters;
  constructor(private pt: PageTitleService, private rt: Router,
              private dialog1: MatDialog) {
    super(pt, rt, dialog1)
  }

  override ngOnInit(): void {
  }

  delete(e) {
    this.deleteEvent.emit(e);
  }

  openDrawer() {
    if(isMobile) {
      this.filters.toggle();
    }
  }

  closeDrawer(e) {
    this.filters.toggle();
  }

}
