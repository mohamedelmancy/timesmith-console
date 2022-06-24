import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BreadcrumbTranslateService} from "../../services/breadcrumb-translate.service";
import {NotificationsComponent} from "./notifications.component";
import {NotificationsResolver} from "../../resolvers/notifications.resolver";
import {CreateNotificationsComponent} from "./create-notifications/create-notifications.component";
import {NotificationResolver} from "../../resolvers/notification.resolver";

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    resolve: {
      notifications: NotificationsResolver,
    },
  },
  {
    path: 'new',
    component: CreateNotificationsComponent,
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
    component: CreateNotificationsComponent,
    data: {
      title: '{{notification.name}}',
      breadcrumbs: '{{breadcrumb}}'
    },
    resolve: {
      notification: NotificationResolver,
      breadcrumb: BreadcrumbTranslateService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
