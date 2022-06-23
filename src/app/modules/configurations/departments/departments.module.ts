import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import {DepartmentsComponent} from "./departments.component";
import {CreateDepartmentComponent} from "./create-department/create-department.component";
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    DepartmentsComponent,
    CreateDepartmentComponent,
  ],
    imports: [
        CommonModule,
        DepartmentsRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule
    ]
})
export class DepartmentsModule { }
