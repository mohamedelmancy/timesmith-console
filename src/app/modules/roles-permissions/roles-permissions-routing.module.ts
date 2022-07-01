import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesAndPermissionsComponent} from "./roles-and-permissions/roles-and-permissions.component";
import {
  CreateRolesAndPermissionsComponent
} from "./create-roles-and-permissions/create-roles-and-permissions.component";
import {RolesAndPermissionsResolver} from "../../resolvers/roles-and-permissions.resolver";
import {RoleAndPermissionResolver} from "../../resolvers/role-and-permission.resolver";
import {BreadcrumbTranslateService} from "../../services/breadcrumb-translate.service";

const routes: Routes = [
      {
        path: '',
        component: RolesAndPermissionsComponent,
        resolve: {
          rolesAndPermissions: RolesAndPermissionsResolver
        }
      },
      {
        path: 'new',
        component: CreateRolesAndPermissionsComponent,
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
        component: CreateRolesAndPermissionsComponent,
        data: {
          title: '{{roleAndPermission.name}}',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          roleAndPermission: RoleAndPermissionResolver,
          breadcrumb: BreadcrumbTranslateService
        }
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionsRoutingModule {
}
