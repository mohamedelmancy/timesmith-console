import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExceptionCodesResolver} from "../../resolvers/exception-codes.resolver";
import {BreadcrumbTranslateService} from "../../services/breadcrumb-translate.service";

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: '',
      //   redirectTo: 'sites',
      //   pathMatch: 'full',
      // },
      {
        path: 'sites',
        // canActivate: [LandingGuard],
        loadChildren: () => import('../../modules/configurations/sites/sites.module').then(m => m.SitesModule),
        data: {
          title: 'Sites',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        },
      },
      {
        path: 'departments',
        // canActivate: [LandingGuard],
        loadChildren: () => import('../../modules/configurations/departments/departments.module').then(m => m.DepartmentsModule),
        data: {
          title: 'Departments',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        },
      },
      {
        path: 'shifts',
        // canActivate: [LandingGuard],
        loadChildren: () => import('../../modules/configurations/shifts/shifts.module').then(m => m.ShiftsModule),
        data: {
          title: 'Shifts',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        },
      },
       {
        path: 'leaves',
        // canActivate: [LandingGuard],
        loadChildren: () => import('../../modules/configurations/leaves/leaves.module').then(m => m.LeavesModule),
        data: {
          title: 'Leaves',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        },
      },
      {
        path: 'exception-codes',
        // canActivate: [LandingGuard],
        loadChildren: () => import('./exception-codes/exception-codes.module').then(m => m.ExceptionCodesModule),
        data: {
          title: 'Exception Codes',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          codes: ExceptionCodesResolver,
          breadcrumb: BreadcrumbTranslateService
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
