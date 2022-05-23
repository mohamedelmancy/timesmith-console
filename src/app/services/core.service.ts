import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})

export class CoreService {
    baseUrl = environment.apiUrl;
    collapseSidebarStatus: boolean = false;
    collapseSidebar = false;
    sidenavMode: any = 'side';
    sidenavOpen = true;
    horizontalSideNavMode = 'over';
    horizontalSideNavOpen = false;
  constructor(private matDialog: MatDialog,
                private http: HttpClient) {
    }

    postRequest(path, body): Observable<any> {
        return this.http.post(`${this.baseUrl}${path}`, body);
    }

    getRequest(path, observe?): Observable<any> {
        return this.http.get(`${this.baseUrl}${path}`, {observe});
    }

    getRequestWithBody(path, body?): Observable<any> {
        return this.http.request('Get', `${this.baseUrl}${path}`, {body});
    }

    putRequest(path, body): Observable<any> {
        return this.http.put(`${this.baseUrl}${path}`, body);
    }

    deleteRequest(path): Observable<any> {
        return this.http.delete(`${this.baseUrl}${path}`);
    }
}
