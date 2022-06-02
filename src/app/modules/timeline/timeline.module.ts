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
import { FiltersComponent } from './today/filters/filters.component';
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";


@NgModule({
  declarations: [
    TodayComponent,
    ListViewComponent,
    TimelineViewComponent,
    FiltersComponent
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
    NgxMatTimepickerModule
  ]
})
export class TimelineModule { }
