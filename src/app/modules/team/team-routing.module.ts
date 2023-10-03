import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndividualsComponent} from "./individuals/individuals.component";
import {CreateIndividualComponent} from "./create-individual/create-individual.component";
import {IndividualsResolver} from "../../resolvers/individuals.resolver";
import {IndividualResolver} from "../../resolvers/individual.resolver";
import {BreadcrumbTranslateService} from "../../services/breadcrumb-translate.service";
import {DepartmentsResolver} from "../../resolvers/departments.resolver";
import {SitesResolver} from "../../resolvers/sites.resolver";
import {OrganizationsResolver} from "../../resolvers/organizations.resolver";
import {ShiftsResolver} from "../../resolvers/shifts.resolver";

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
          breadcrumb: BreadcrumbTranslateService,
          departments: DepartmentsResolver,
          sites: SitesResolver,
          organizations: OrganizationsResolver,
          shifts: ShiftsResolver,
        }
      },
      {
        path: ':id',
        component: CreateIndividualComponent,
        data: {
          title: 'Update team member',
          breadcrumbs: '{{team.data.name}}'
        },
        resolve: {
          team: IndividualResolver,
          departments: DepartmentsResolver,
          shifts: ShiftsResolver,
          sites: SitesResolver,
          organizations: OrganizationsResolver,
        }
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
