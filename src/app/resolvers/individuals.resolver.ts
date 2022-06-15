import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {CoreService} from "../services/core.service";

@Injectable({
  providedIn: 'root'
})
export class IndividualsResolver implements Resolve<boolean> {
  constructor(private coreService: CoreService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // return this.coreService.getRequest(`team`)
    return of(true);
  }
}
