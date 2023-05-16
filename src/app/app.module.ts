import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MainComponent} from './core/components/main/main.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SideBarComponent} from './core/components/side-bar/side-bar.component';
import {FooterComponent} from './core/components/footer/footer.component';
import {LanguageDropDownComponent} from './core/components/language-drop-down/language-drop-down.component';
import {MatListModule} from "@angular/material/list";
// import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {MatCardModule} from "@angular/material/card";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MenuItems} from "./core/menu/menu-items/menu-items";
import {PageTitleService} from "./core/page-title/page-title.service";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./core/guards/auth.guard";
import {LandingGuard} from "./core/guards/landing.guard";

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true
// };
import {AuthInterceptor} from "./services/interceptor";
import {ToastrModule} from "ngx-toastr";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {TooltipModule} from "ng2-tooltip-directive";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MenuToggleModule} from "./core/menu/menu-toggle.module";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule} from "@angular/material/core"; // a plugin!
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {CreateTimelineComponent} from './modals/create-timeline/create-timeline.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipOptions} from 'ng2-tooltip-directive';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import {NgxMatMomentModule} from "@angular-material-components/moment-adapter";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {GetLanguage} from "./shared/functions/shared-functions";
import {MY_FORMATS} from "./modules/timeline/timeline.module";
import {getDutchPaginatorIntl} from "./shared/functions/dutch-paginator-intl";
import {DeleteComponent} from './modals/delete/delete.component';
import {ChangePasswordComponent} from './modules/authentication/change-password/change-password.component';
import {ViewPermissionsComponent} from './modals/view-permissions/view-permissions.component';
import {BreadcrumbsModule} from "@exalif/ngx-breadcrumbs";
import {StatusActionComponent} from './modals/status-action/status-action.component';
import {ViewNotificationComponent} from './modals/view-notification/view-notification.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";

// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   resourceTimelinePlugin,
//   dayGridPlugin,
//   interactionPlugin,
// ]);

export const MyDefaultTooltipOptions: TooltipOptions = {
  'show-delay': 0,
  'hideDelay': 0,
}

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
    CreateTimelineComponent,
    DeleteComponent,
    ChangePasswordComponent,
    ViewPermissionsComponent,
    StatusActionComponent,
    ViewNotificationComponent,
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
    // PerfectScrollbarModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    ExtendedModule,
    FullCalendarModule,
    ToastrModule.forRoot(
      {
        // maxOpened: 1,
        positionClass: 'toast-custom-position'
      }
    ),
    MatAutocompleteModule,
    MatPaginatorModule,
    TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions),
    FontAwesomeModule,
    MenuToggleModule,
    MatRippleModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule.setLocale(GetLanguage() === 'ar' ? 'ar-SA' : 'en-GB'),
    MatNativeDateModule,
    NgxMatMomentModule,
    DragDropModule,
    NgxMatNativeDateModule,
    BreadcrumbsModule.forRoot({
      postProcess: null,
      applyDistinctOn: 'text',
    }),
    AngularMultiSelectModule
  ],
  providers: [
    MenuItems, PageTitleService,
    PageTitleService,
    AuthService,
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // },
    AuthGuard,
    LandingGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: GetLanguage() === 'ar' ? 'ar-SA' : 'en-GB'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl()},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // entryComponents: [CreateTimelineComponent, DeleteComponent, ViewPermissionsComponent, ViewNotificationComponent]
})
export class AppModule {
}
