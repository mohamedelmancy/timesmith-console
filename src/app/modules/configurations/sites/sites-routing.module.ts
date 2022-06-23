import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SitesComponent} from "./sites.component";
import {SitesResolver} from "../../../resolvers/sites.resolver";
import {BreadcrumbTranslateService} from "../../../services/breadcrumb-translate.service";
import {CreateSiteComponent} from "./create-site/create-site.component";
import {SiteResolver} from "../../../resolvers/site.resolver";

const routes: Routes = [
      {
        path: '',
        component: SitesComponent,
        resolve: {
          sites: SitesResolver,
        },
      },
      {
        path: 'new',
        component: CreateSiteComponent,
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
        component: CreateSiteComponent,
        data: {
          title: '{{site.name}}',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          site: SiteResolver,
          breadcrumb: BreadcrumbTranslateService
        }
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
