import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { IndividualsComponent } from './individuals/individuals.component';
import { CreateIndividualComponent } from './create-individual/create-individual.component';
import {SharedModule} from "../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    IndividualsComponent,
    CreateIndividualComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TeamModule { }
