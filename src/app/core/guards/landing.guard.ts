import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class LandingGuard implements CanActivate {

    constructor(private router: Router, private userAuthService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.userAuthService.getLocalStorageUser()) {
            // Not logged in so return true
            return true;
        }

        // logged in so redirect to dashboard with the return url
        this.router.navigate(['/reception']);
        return false;
    }
}
