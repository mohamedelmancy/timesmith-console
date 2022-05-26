import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingGuard} from "./core/guards/landing.guard";
import {AuthGuard} from "./core/guards/auth.guard";
import {MainComponent} from "./core/components/main/main.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'timeline',
    pathMatch: 'full',
  },
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
        canActivate: [LandingGuard],
        loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
      {
        path: 'timeline',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/timeline/timeline.module').then(m => m.TimelineModule)
      },

    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
