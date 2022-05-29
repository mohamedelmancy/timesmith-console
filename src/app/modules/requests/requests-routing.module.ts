import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodayComponent} from "../timeline/today/today.component";
import {RequestsListComponent} from "./requests-list/requests-list.component";

const routes: Routes = [
  {
    path: '',
    component: RequestsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
