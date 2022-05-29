import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { MainComponent } from './core/components/main/main.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SideBarComponent } from './core/components/side-bar/side-bar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LanguageDropDownComponent } from './core/components/language-drop-down/language-drop-down.component';
import {MatListModule} from "@angular/material/list";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {MatCardModule} from "@angular/material/card";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MenuItems} from "./core/menu/menu-items/menu-items";
import {PageTitleService} from "./core/page-title/page-title.service";
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // a plugin!
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  resourceTimelinePlugin,
]);
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideBarComponent,
    FooterComponent,
    LanguageDropDownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    PerfectScrollbarModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    ExtendedModule,
    FullCalendarModule
  ],
  providers: [MenuItems, PageTitleService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
