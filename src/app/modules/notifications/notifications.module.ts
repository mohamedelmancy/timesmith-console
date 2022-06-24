import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import {CreateNotificationsComponent} from "./create-notifications/create-notifications.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    NotificationsComponent,
    CreateNotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgMultiSelectDropDownModule,
    MatSelectModule,
    MatIconModule,
  ]
})
export class NotificationsModule { }
