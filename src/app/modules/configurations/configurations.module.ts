import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationsRoutingModule} from './configurations-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {SiteResolver} from "../../resolvers/site.resolver";
import {BreadcrumbTranslateService} from "../../services/breadcrumb-translate.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    SharedModule,
  ],
  providers: [SiteResolver, BreadcrumbTranslateService]
})
export class ConfigurationsModule {
}
