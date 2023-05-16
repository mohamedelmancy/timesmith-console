import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {secureStorage} from "../shared/functions/secure-storage";
import {GetCurrentUser, GetLanguage} from "../shared/functions/shared-functions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<any> = new BehaviorSubject(true);
  userData: any;
  isLoggedIn = false;

  constructor(private router: Router) {
  }

  getLocalStorageUser() {
    this.userData = GetCurrentUser();
    if (this.userData) {
      this.isLoggedIn = true;
      this.loggedIn.next(true);
      return this.userData;
    } else {
      this.isLoggedIn = false;
      this.loggedIn.next(false)
      return null;
    }
  }

  logOut() {
    const lang = GetLanguage();
    secureStorage.clearAll();
    secureStorage.setItem('lang', lang);
    this.isLoggedIn = false;
    this.loggedIn.next(false);
    this.router.navigate(['/auth/login']);
  }

  isAuthorized() {
    return (secureStorage.getItem('userProfile') !== null) && (secureStorage.getItem('userProfile') !== undefined);
  }

  setLocalUserProfile(value) {
    secureStorage.setItem('userProfile', value);
    this.getLocalStorageUser();
  }

  setToken(token) {
    secureStorage.setItem('token', token);
  }

  getToken(token) {
    return secureStorage.getItem('token');
  }

  handleError(error: HttpErrorResponse) {
    // console.log('error', error)
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
