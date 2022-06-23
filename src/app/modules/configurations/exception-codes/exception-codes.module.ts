import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionCodesRoutingModule } from './exception-codes-routing.module';
import {ExceptionCodesComponent} from "./exception-codes.component";
import {CreateExceptionCodeComponent} from "./create-exception-code/create-exception-code.component";
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ExceptionCodesComponent,
    CreateExceptionCodeComponent
  ],
  imports: [
    CommonModule,
    ExceptionCodesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ExceptionCodesModule { }
