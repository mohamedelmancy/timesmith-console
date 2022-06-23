import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsListComponent } from './requests-list/requests-list.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    RequestsListComponent
  ],
    imports: [
        CommonModule,
        RequestsRoutingModule,
        SharedModule
    ]
})
export class RequestsModule { }
