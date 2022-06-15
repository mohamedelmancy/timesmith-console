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
export class ShiftResolver implements Resolve<boolean> {
  constructor(private coreService: CoreService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.params['id'];
    // return this.coreService.getRequest(`shift/${id}`)
    return of(true);
  }
}
