import { Injectable } from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  isMobile$ = this.breakpointObserver.observe(`(max-width: 599px)`).pipe(
    map(state => state.matches)
  );
}
