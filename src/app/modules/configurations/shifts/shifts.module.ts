import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftsRoutingModule } from './shifts-routing.module';
import {ShiftsComponent} from "./shifts.component";
import {CreateShiftComponent} from "./create-shift/create-shift.component";
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ShiftsComponent,
    CreateShiftComponent,
  ],
  imports: [
    CommonModule,
    ShiftsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgMultiSelectDropDownModule,
    NgxMatTimepickerModule,
    MatIconModule
  ]
})
export class ShiftsModule { }
