import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    SupportComponent
  ],
    imports: [
        CommonModule,
        SupportRoutingModule,
        MatIconModule,
        TranslateModule
    ]
})
export class SupportModule { }
