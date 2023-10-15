import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodayComponent} from "./today/today.component";
import {IndividualsResolver} from "../../resolvers/individuals.resolver";

const routes: Routes = [
  {
    path: '',
    component: TodayComponent,
    resolve: {
      individuals: IndividualsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
