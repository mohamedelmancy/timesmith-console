import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    MatIconModule
  ]
})
export class SupportModule { }
