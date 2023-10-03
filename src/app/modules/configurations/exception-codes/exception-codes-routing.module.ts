import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExceptionCodesComponent} from "./exception-codes.component";
import {ExceptionCodesResolver} from "../../../resolvers/exception-codes.resolver";
import {BreadcrumbTranslateService} from "../../../services/breadcrumb-translate.service";
import {CreateExceptionCodeComponent} from "./create-exception-code/create-exception-code.component";
import {ExceptionCodeResolver} from "../../../resolvers/exception-code.resolver";

const routes: Routes = [
  {
    path: '',
    component: ExceptionCodesComponent,
    resolve: {
      exceptionCodes: ExceptionCodesResolver,
    }
  },
  {
    path: 'new',
    component: CreateExceptionCodeComponent,
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
    component: CreateExceptionCodeComponent,
    data: {
      title: 'Update Exception code',
      breadcrumbs: '{{exceptionCode.data.name}}'
    },
    resolve: {
      exceptionCode: ExceptionCodeResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionCodesRoutingModule { }
