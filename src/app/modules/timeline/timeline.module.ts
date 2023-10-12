import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TodayComponent } from './today/today.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import { ListViewComponent } from './today/list-view/list-view.component';
import { TimelineViewComponent } from './today/timeline-view/timeline-view.component';
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../../shared/shared.module";
import {FlexModule} from "@angular/flex-layout";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {TranslateModule} from "@ngx-translate/core";
import {TooltipModule} from "ng2-tooltip-directive";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {FiltersComponent} from './today/filters/filters.component';
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import { DataViewComponent } from './today/data-view/data-view.component';
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {ClickOutsideModule} from "ng-click-outside";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {dateFormat} from "../../shared/variables/variables";
import {GetLanguage} from "../../shared/functions/shared-functions";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
export const MY_FORMATS = {
  parse: {
    dateInput: dateFormat,
  },
  display: {
    dateInput: dateFormat,
    monthYearLabel: dateFormat,
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    TodayComponent,
    ListViewComponent,
    TimelineViewComponent,
    FiltersComponent,
    DataViewComponent
  ],
    imports: [
        CommonModule,
        TimelineRoutingModule,
        FullCalendarModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatTabsModule,
        MatIconModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        SharedModule,
        FlexModule,
        MatAutocompleteModule,
        TranslateModule,
        TooltipModule,
        MatButtonModule,
        MatDividerModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        ClickOutsideModule,
        MatSidenavModule,
        BsDatepickerModule
    ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_LOCALE, useValue: GetLanguage() === 'ar' ? 'ar-SA' : 'en-GB'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class TimelineModule { }
