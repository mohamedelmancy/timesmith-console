import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TodayComponent } from './today/today.component';


@NgModule({
  declarations: [
    TodayComponent
  ],
  imports: [
    CommonModule,
    TimelineRoutingModule
  ]
})
export class TimelineModule { }
