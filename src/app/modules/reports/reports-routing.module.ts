import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from "./reports.component";
import {ReportsResolver} from "../../resolvers/reports.resolver";

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    resolve: {
      reports: ReportsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
