import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingGuard} from "./core/guards/landing.guard";
import {AuthGuard} from "./core/guards/auth.guard";
import {MainComponent} from "./core/components/main/main.component";
import {ChangePasswordComponent} from "./modules/authentication/change-password/change-password.component";
import {BreadcrumbTranslateService} from "./services/breadcrumb-translate.service";

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
          title: 'Today',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
      {
        path: 'requests',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule),
        data: {
          title: 'Requests',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
      {
        path: 'reports',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
        data: {
          title: 'Reports',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
      {
        path: 'notifications',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule),
        data: {
          title: 'Notifications',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
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
          title: 'Team',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
      {
        path: 'roles-permissions',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/roles-permissions/roles-permissions.module').then(m => m.RolesPermissionsModule),
        data: {
          title: 'Roles and Permissions',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
      {
        path: 'support',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/support/support.module').then(m => m.SupportModule),
        data: {
          title: 'Support',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'Change password',
          breadcrumbs: '{{breadcrumb}}'
        },
        resolve: {
          breadcrumb: BreadcrumbTranslateService
        }
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
