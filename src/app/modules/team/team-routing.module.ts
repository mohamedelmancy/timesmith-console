import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndividualsComponent} from "./individuals/individuals.component";
import {CreateIndividualComponent} from "./create-individual/create-individual.component";
import {IndividualsResolver} from "../../resolvers/individuals.resolver";
import {IndividualResolver} from "../../resolvers/individual.resolver";
import {BreadcrumbTranslateService} from "../../services/breadcrumb-translate.service";

const routes: Routes = [
      {
        path: '',
        component: IndividualsComponent,
        resolve: {
          individuals: IndividualsResolver
        }
      },
      {
        path: 'new',
        component: CreateIndividualComponent,
        data: {
          title: 'New',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
      {
        path: ':id',
        component: CreateIndividualComponent,
        data: {
          title: '{{team.name}}',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          team: IndividualResolver,
          breadcrumb: BreadcrumbTranslateService
        }
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
