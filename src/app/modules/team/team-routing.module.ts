import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndividualsComponent} from "./individuals/individuals.component";
import {CreateIndividualComponent} from "./create-individual/create-individual.component";
import {IndividualsResolver} from "../../resolvers/individuals.resolver";
import {IndividualResolver} from "../../resolvers/individual.resolver";
import {CreateShiftComponent} from "../configurations/shifts/create-shift/create-shift.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: IndividualsComponent,
        resolve: {
          individuals: IndividualsResolver
        }
      },
      {
        path: 'create-team',
        component: CreateIndividualComponent,
      },
      {
        path: 'view-team/:id',
        component: CreateIndividualComponent,
        resolve: {
          team: IndividualResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
