import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { SitesComponent } from './sites/sites.component';
import { CreateSiteComponent } from './sites/create-site/create-site.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { CreateShiftComponent } from './shifts/create-shift/create-shift.component';
import { LeavesComponent } from './leaves/leaves.component';
import { CreateLeaveComponent } from './leaves/create-leave/create-leave.component';
import { ExceptionCodesComponent } from './exception-codes/exception-codes.component';
import { CreateExceptionCodeComponent } from './exception-codes/create-exception-code/create-exception-code.component';
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {SiteResolver} from "../../resolvers/site.resolver";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    SitesComponent,
    CreateSiteComponent,
    DepartmentsComponent,
    CreateDepartmentComponent,
    ShiftsComponent,
    CreateShiftComponent,
    LeavesComponent,
    CreateLeaveComponent,
    ExceptionCodesComponent,
    CreateExceptionCodeComponent
  ],
    imports: [
        CommonModule,
        ConfigurationsRoutingModule,
        SharedModule,
        MatButtonModule,
        TranslateModule,
        MatIconModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatInputModule,
        NgMultiSelectDropDownModule,
        NgxMatTimepickerModule,
        MatAutocompleteModule,
    ],
  providers: [SiteResolver]
})
export class ConfigurationsModule { }
