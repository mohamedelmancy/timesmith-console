import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesPermissionsRoutingModule } from './roles-permissions-routing.module';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { CreateRolesAndPermissionsComponent } from './create-roles-and-permissions/create-roles-and-permissions.component';
import {SharedModule} from "../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    RolesAndPermissionsComponent,
    CreateRolesAndPermissionsComponent
  ],
  imports: [
    CommonModule,
    RolesPermissionsRoutingModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RolesPermissionsModule { }
