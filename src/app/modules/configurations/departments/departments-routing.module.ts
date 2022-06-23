import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartmentsComponent} from "./departments.component";
import {DepartmentsResolver} from "../../../resolvers/departments.resolver";
import {BreadcrumbTranslateService} from "../../../services/breadcrumb-translate.service";
import {CreateDepartmentComponent} from "./create-department/create-department.component";
import {DepartmentResolver} from "../../../resolvers/department.resolver";

const routes: Routes = [
  {
    path: '',
    component: DepartmentsComponent,
    resolve: {
      departments: DepartmentsResolver,
    }
  },
  {
    path: 'new',
    component: CreateDepartmentComponent,
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
    component: CreateDepartmentComponent,
    data: {
      title: '{{department.name}}',
      breadcrumbs: '{{breadcrumb}}'
    },
    resolve: {
      department: DepartmentResolver,
      breadcrumb: BreadcrumbTranslateService
    }
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule {
}
