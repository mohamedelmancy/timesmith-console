import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndividualsComponent} from "./individuals/individuals.component";
import {CreateIndividualComponent} from "./create-individual/create-individual.component";
import {IndividualsResolver} from "../../resolvers/individuals.resolver";

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
        path: 'create-employee',
        component: CreateIndividualComponent,
        resolve: {
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
