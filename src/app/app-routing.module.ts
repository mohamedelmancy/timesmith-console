import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingGuard} from "./core/guards/landing.guard";
import {AuthGuard} from "./core/guards/auth.guard";
import {MainComponent} from "./core/components/main/main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        redirectTo: 'timeline',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        // canActivate: [LandingGuard],
        loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
      {
        path: 'timeline',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/timeline/timeline.module').then(m => m.TimelineModule)
      },
      {
        path: 'requests',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule)
      },
      {
        path: 'reports',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'notifications',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'configurations',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/configurations/configurations.module').then(m => m.ConfigurationsModule)
      },
      {
        path: 'team',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/team/team.module').then(m => m.TeamModule)
      },
      {
        path: 'roles-permissions',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/roles-permissions/roles-permissions.module').then(m => m.RolesPermissionsModule)
      },
      {
        path: 'support',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/support/support.module').then(m => m.SupportModule)
      },
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'auth/login'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
