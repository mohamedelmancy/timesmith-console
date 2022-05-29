import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TodayComponent } from './today/today.component';
import {FullCalendarModule} from "@fullcalendar/angular";


@NgModule({
  declarations: [
    TodayComponent
  ],
    imports: [
        CommonModule,
        TimelineRoutingModule,
        FullCalendarModule
    ]
})
export class TimelineModule { }
