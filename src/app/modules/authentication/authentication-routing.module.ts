import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";

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
        component: LoginComponent
      },
      // {
      //   path: 'register',
      //   component: RegisterComponent
      // },
      // {
      //   path: 'reset-password',
      //   component: ResetPasswordComponent
      // },
      // {
      //   path: 'forgot-password',
      //   component: ForgotPasswordComponent
      // },
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
