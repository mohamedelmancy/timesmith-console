import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SitesComponent} from "./sites/sites.component";
import {DepartmentsComponent} from "./departments/departments.component";
import {ShiftsComponent} from "./shifts/shifts.component";
import {LeavesComponent} from "./leaves/leaves.component";
import {ExceptionCodesComponent} from "./exception-codes/exception-codes.component";
import {CreateSiteComponent} from "./sites/create-site/create-site.component";
import {CreateDepartmentComponent} from "./departments/create-department/create-department.component";
import {SiteResolver} from "../../resolvers/site.resolver";
import {CreateShiftComponent} from "./shifts/create-shift/create-shift.component";
import {ShiftResolver} from "../../resolvers/shift.resolver";
import {CreateLeaveComponent} from "./leaves/create-leave/create-leave.component";
import {LeaveResolver} from "../../resolvers/leave.resolver";
import {CreateExceptionCodeComponent} from "./exception-codes/create-exception-code/create-exception-code.component";
import {ExceptionCodeResolver} from "../../resolvers/exception-code.resolver";
import {DepartmentResolver} from "../../resolvers/department.resolver";
import {SitesResolver} from "../../resolvers/sites.resolver";
import {DepartmentsResolver} from "../../resolvers/departments.resolver";
import {ShiftsResolver} from "../../resolvers/shifts.resolver";
import {LeavesResolver} from "../../resolvers/leaves.resolver";
import {ExceptionCodesResolver} from "../../resolvers/exception-codes.resolver";
import {BreadcrumbTranslateService} from "../../services/breadcrumb-translate.service";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'sites',
        pathMatch: 'full',
      },
      {
        path: 'sites',
        component: SitesComponent,
        data: {
          title: 'Sites',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          sites: SitesResolver,
          breadcrumb: BreadcrumbTranslateService
        },
      },
      {
        path: 'create-site',
        component: CreateSiteComponent,
      },
      {
        path: 'view-site/:id',
        component: CreateSiteComponent,
        resolve: {
          site: SiteResolver
        }
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        resolve: {
          departments: DepartmentsResolver
        }
      },
      {
        path: 'create-department',
        component: CreateDepartmentComponent,
      },
      {
        path: 'view-department/:id',
        component: CreateDepartmentComponent,
        resolve: {
          department: DepartmentResolver
        }
      },
      {
        path: 'shifts',
        component: ShiftsComponent,
        resolve: {
          shifts: ShiftsResolver
        }
      },
      {
        path: 'create-shift',
        component: CreateShiftComponent,
      },
      {
        path: 'view-shift/:id',
        component: CreateShiftComponent,
        resolve: {
          shift: ShiftResolver
        }
      },
      {
        path: 'leaves',
        component: LeavesComponent,
        resolve: {
          leaves: LeavesResolver
        }
      },
      {
        path: 'create-leave',
        component: CreateLeaveComponent,
      },
      {
        path: 'view-leave/:id',
        component: CreateLeaveComponent,
        resolve: {
          leave: LeaveResolver
        }
      },
      {
        path: 'exceptions-codes',
        component: ExceptionCodesComponent,
        resolve: {
          exceptionCodes: ExceptionCodesResolver
        }
      },
      {
        path: 'create-exception-code',
        component: CreateExceptionCodeComponent,
      },
      {
        path: 'view-exception-code/:id',
        component: CreateExceptionCodeComponent,
        resolve: {
          exceptionCode: ExceptionCodeResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
