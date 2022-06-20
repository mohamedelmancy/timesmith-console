import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {TooltipModule} from "ng2-tooltip-directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatSliderModule} from "@angular/material/slider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MenuToggleModule} from "../core/menu/menu-toggle.module";
import { DataTableComponent } from './components/data-table/data-table.component';
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";
import { SideFilterComponent } from './components/side-filter/side-filter.component';
import { DataTableContainerComponent } from './components/data-table-container/data-table-container.component';
import {MenuToggleAnchorDirective, MenuToggleDirective, MenuToggleLinkDirective} from "../core/menu/menu-toggle";



@NgModule({
  declarations: [
    LoaderComponent,
    DataTableComponent,
    SideFilterComponent,
    DataTableContainerComponent
  ],
  exports: [
    LoaderComponent,
    TooltipModule,
    DataTableComponent,
    TranslateModule,
    DataTableContainerComponent

  ],
    imports: [
        CommonModule,
        TooltipModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlexLayoutModule,
        PerfectScrollbarModule,
        MenuToggleModule,
        HttpClientModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatExpansionModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatChipsModule,
        MatListModule,
        MatSidenavModule,
        MatTabsModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatSliderModule,
        MatRadioModule,
        MatDialogModule,
        MatGridListModule,
        ToastrModule.forRoot(
            {
                // maxOpened: 1,
                positionClass: 'toast-custom-position'
            }
        ),
        MatAutocompleteModule,
        MatPaginatorModule,
        TranslateModule,
        RouterModule,
        MatRippleModule,
    ],
  providers: [
    MenuToggleDirective,
    MenuToggleLinkDirective,
    MenuToggleAnchorDirective
  ]
})
export class SharedModule { }
