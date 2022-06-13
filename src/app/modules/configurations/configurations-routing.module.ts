import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SitesComponent} from "./sites/sites.component";
import {DepartmentsComponent} from "./departments/departments.component";
import {ShiftsComponent} from "./shifts/shifts.component";
import {LeavesComponent} from "./leaves/leaves.component";
import {ExceptionCodesComponent} from "./exception-codes/exception-codes.component";
import {CreateSiteComponent} from "./sites/create-site/create-site.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sites',
        component: SitesComponent,
      },
      {
        path: 'create-site',
        component: CreateSiteComponent,
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
      },
      {
        path: 'shifts',
        component: ShiftsComponent,
      },
      {
        path: 'leaves',
        component: LeavesComponent,
      },
      {
        path: 'exceptions-codes',
        component: ExceptionCodesComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
