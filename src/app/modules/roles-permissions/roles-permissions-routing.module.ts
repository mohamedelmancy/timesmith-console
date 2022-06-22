import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesAndPermissionsComponent} from "./roles-and-permissions/roles-and-permissions.component";
import {
  CreateRolesAndPermissionsComponent
} from "./create-roles-and-permissions/create-roles-and-permissions.component";
import {RolesAndPermissionsResolver} from "../../resolvers/roles-and-permissions.resolver";
import {RoleAndPermissionResolver} from "../../resolvers/role-and-permission.resolver";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RolesAndPermissionsComponent,
        resolve: {
          rolesAndPermissions: RolesAndPermissionsResolver
        }
      },
      {
        path: 'create-roles-permissions',
        component: CreateRolesAndPermissionsComponent,
      },
      {
        path: 'view-roles-permissions/:id',
        component: CreateRolesAndPermissionsComponent,
        resolve: {
          roleAndPermission: RoleAndPermissionResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionsRoutingModule {
}
