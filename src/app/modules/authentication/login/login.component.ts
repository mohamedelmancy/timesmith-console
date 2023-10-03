import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {environment} from "../../../../environments/environment";
import {CoreService} from "../../../services/core.service";
import {HandleResponseError} from "../../../shared/functions/shared-functions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  returnedUrl: string;
  remember = true;
  mainLogo = environment.mainLogo;

  constructor(public coreService: CoreService,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public translate: TranslateService) {
  }

  ngOnInit() {
    this.returnedUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    // console.log('returnUrl', this.returnedUrl)
  }

  // when email and password is correct, user logged in.
  login(value) {
    // console.log('value', value);
    localStorage.setItem('remember', JSON.stringify(this.remember));
    this.authService.setToken('res.token');
    this.authService.setLocalUserProfile('res.user');
    var data = new FormData();
    data.append("username", value?.username);
    data.append("password", value?.password);
    this.coreService.postRequest('console/login', data).subscribe(
      res => {
        localStorage.setItem('remember', JSON.stringify(this.remember));
        this.authService.setToken(res.token);
        this.authService.setLocalUserProfile(res.user);
        this.translate.get('Successfully logged in!').subscribe(word => {
          this.toastr.success(word);
        });
        if (this.returnedUrl) {
          this.router.navigate([this.returnedUrl]);
        } else {
          this.router.navigate(['/timeline']);
        }
      }, error => {
        // console.log('err', error)
        this.toastr.error(HandleResponseError(error));
      }
    )
  }

}
