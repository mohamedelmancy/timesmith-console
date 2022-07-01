import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {BreadcrumbTranslateService} from "../../services/breadcrumb-translate.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Sign in',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      // {
      //   path: 'reset-password',
      //   component: ResetPasswordComponent
      // },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: 'Forget password',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
      // {
      //   path: 'confirm-otp',
      //   component: OtpConfirmComponent
      // },
      // {
      //   path: 'success-change-password',
      //   component: SuccessChangePasswordComponent
      // },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
