import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeavesComponent} from "./leaves.component";
import {LeavesResolver} from "../../../resolvers/leaves.resolver";
import {BreadcrumbTranslateService} from "../../../services/breadcrumb-translate.service";
import {CreateLeaveComponent} from "./create-leave/create-leave.component";
import {LeaveResolver} from "../../../resolvers/leave.resolver";

const routes: Routes = [
  {
    path: '',
    component: LeavesComponent,
    resolve: {
      leaves: LeavesResolver,
    }
  },
  {
    path: 'new',
    component: CreateLeaveComponent,
    data: {
      title: 'New',
      breadcrumbs: '{{breadcrumb}}'
    },
    resolve: {
      breadcrumb: BreadcrumbTranslateService
    }
  },
  {
    path: ':id',
    component: CreateLeaveComponent,
    data: {
      title: '{{leave.name}}',
      breadcrumbs: '{{breadcrumb}}'
    },
    resolve: {
      leave: LeaveResolver,
      breadcrumb: BreadcrumbTranslateService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule { }
