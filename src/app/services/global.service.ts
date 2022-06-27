import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  getMatIcons(): Observable<any> {
    return this.http.get(`assets/js/icon-names.json`);
  }
}
