import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingGuard} from "./core/guards/landing.guard";
import {AuthGuard} from "./core/guards/auth.guard";
import {MainComponent} from "./core/components/main/main.component";
import {ChangePasswordComponent} from "./modules/authentication/change-password/change-password.component";

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
        loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
        data: {
          breadcrumbs: ''
        }
      },
      {
        path: 'timeline',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/timeline/timeline.module').then(m => m.TimelineModule),
        data: {
          breadcrumbs: 'Today'
        }
      },
      {
        path: 'requests',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule),
        data: {
          breadcrumbs: 'Requests'
        }
      },
      {
        path: 'reports',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
        data: {
          breadcrumbs: 'Reports'
        }
      },
      {
        path: 'notifications',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule),
        data: {
          breadcrumbs: 'Notifications'
        }
      },
      {
        path: 'configurations',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/configurations/configurations.module').then(m => m.ConfigurationsModule),
        data: {
          // breadcrumbs: 'Configurations'
        }
      },
      {
        path: 'team',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/team/team.module').then(m => m.TeamModule),
        data: {
          breadcrumbs: 'Team'
        }
      },
      {
        path: 'roles-permissions',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/roles-permissions/roles-permissions.module').then(m => m.RolesPermissionsModule),
        data: {
          breadcrumbs: 'Roles and Permissions'
        }
      },
      {
        path: 'support',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/support/support.module').then(m => m.SupportModule),
        data: {
          breadcrumbs: 'Support'
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
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
