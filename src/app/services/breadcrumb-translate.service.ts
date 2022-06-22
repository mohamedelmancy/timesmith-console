import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve, RouterStateSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class BreadcrumbTranslateService implements Resolve<any> {
  constructor(private translate: TranslateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any  {
    const value = route.data['title'];
    return this.translate?.get(value);
  }
}
