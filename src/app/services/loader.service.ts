import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export interface LoaderState {
  show: boolean;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  show(text?: any) {
    this.loaderSubject.next(<LoaderState> {show: true, text});
  }

  hide() {
    this.loaderSubject.next(<LoaderState> {show: false});
  }
}
