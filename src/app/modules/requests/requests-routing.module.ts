import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequestsListComponent} from "./requests-list/requests-list.component";
import {RequestsResolver} from "../../resolvers/requests.resolver";

const routes: Routes = [
  {
    path: '',
    component: RequestsListComponent,
    resolve: {
      reports: RequestsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
