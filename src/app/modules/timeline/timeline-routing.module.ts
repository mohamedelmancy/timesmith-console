import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingGuard} from "../../core/guards/landing.guard";
import {TodayComponent} from "./today/today.component";

const routes: Routes = [
  {
    path: '',
    component: TodayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
