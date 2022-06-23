import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BreadcrumbTranslateService} from "../../../services/breadcrumb-translate.service";
import {ShiftsComponent} from "./shifts.component";
import {ShiftsResolver} from "../../../resolvers/shifts.resolver";
import {CreateShiftComponent} from "./create-shift/create-shift.component";
import {ShiftResolver} from "../../../resolvers/shift.resolver";

const routes: Routes = [
  {
    path: '',
    component: ShiftsComponent,
    resolve: {
      shifts: ShiftsResolver,
    }
  },
  {
    path: 'new',
    component: CreateShiftComponent,
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
    component: CreateShiftComponent,
    data: {
      title: '{{shift.name}}',
      breadcrumbs: '{{breadcrumb}}'
    },
    resolve: {
      shift: ShiftResolver,
      breadcrumb: BreadcrumbTranslateService
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftsRoutingModule { }
