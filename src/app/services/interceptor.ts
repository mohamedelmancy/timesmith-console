import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {throwError, Observable, BehaviorSubject, of} from 'rxjs';
import {catchError, filter, take, switchMap, finalize, delay, tap} from 'rxjs/operators';
import {secureStorage} from '../../Shared/functions/secure-local-storage';
import {LoaderServiceService} from './loader-service.service';
import {AuthService} from '../auth-service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import { HandleResponseError } from 'app/Shared/functions/shared-functions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private AUTH_HEADER = 'Authorization';
    private token = secureStorage.getItem('token');
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    constructor(
        private loaderService: LoaderServiceService,
        private translateService: TranslateService,
        private authService: AuthService,
        private toastr: ToastrService
    ) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('FileScanner')) {
            this.translateService.get('Scanning').subscribe(word => {
                this.loaderService.show(word);
            })
        } else {
            this.loaderService.show();
        }
        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                        this.loaderService.hide();
                }
            }),
            catchError((error: HttpErrorResponse) => {
                this.loaderService.hide();
                let activeToast;
                if (error && (error.status === 401 || error.status === 403)) {
                    this.translateService.get('not-authorized').pipe( take(1)).subscribe(phrase => {
                        this.toastr?.clear();
                        if (!activeToast) {
                            activeToast = this.toastr.show(phrase);
                        }
                    })
                  setTimeout(() => {
                      this.authService.logOut();
                  }, 2000)
                } else if (error && (error.status === 500 || error.status === 0)) {
                    this.translateService.get('An error has occurred, please try again later').subscribe(word => {
                        this.toastr.error(word);
                    })
                } else if (error && error.status === 400) {
                    error.error.title?.includes('One or more validation errors occurred') ? 
                        this.translateService.get("One or more validation errors occurred").subscribe(word => this.toastr.error(word)) : 
                        this.toastr.error(HandleResponseError(error));
                } else {
                    return throwError(error);
                }
            })
        );
    }

    refreshAccessToken(): Observable<any> {
        return of(secureStorage.getItem('token'));
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        this.token = secureStorage.getItem('token');
        if (!this.token) {
            return request;
        }
        // If you are calling an outside domain then do not add the token.
        if (request.url.includes('Login') || (request.url.includes('Register') && !request.url.includes('RegisterBackOffice')) || request.url.includes('Password') || request.url.includes('assets')) {
            return request;
        }
        if (request.url.includes('Document/UplaodDocs') || request.url.includes('upload-document')) {
            return request.clone({
                headers: request.headers.delete('Content-Type').set(this.AUTH_HEADER, `Bearer ${this.token}`)
            });
        }
        if (request.url.includes('FileScanner')) {
            return request.clone({
                headers: request.headers.delete('Content-Type')
            });
        }

        return request.clone({
            // headers: request.headers.set(this.AUTH_HEADER, this.token)
            setHeaders: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }
}
