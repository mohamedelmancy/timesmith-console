import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../services/auth.service";
import {CoreService} from "../../../services/core.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  mobile: string;
  mainLogo = environment.mainLogo;
  isValidPhone: boolean = true;
  isValidMail: boolean = true;
  loadSubmitBtn: boolean = false;
  constructor(public authService: AuthService,
              private toastr: ToastrService,
              public translate: TranslateService,
              private router: Router,
              private CoreService: CoreService) {
  }

  /**
   * send method is used to send a reset password link into your email.
   */
  send(value) {
    this.loadSubmitBtn = true;
    const inputValue = value.mobile;
    this.isValidMail = this.validateEmail(value.mobile);
    this.isValidPhone = this.validatePhone(value.mobile);
    const urlParams = this.isValidMail ? `Email=${inputValue}` : this.isValidPhone ? `MobileNum=${inputValue}` : false;
    if(this.isValidMail || this.isValidPhone) {
      this.CoreService.postRequest(`User/ForgetPassword?${urlParams}&auditPageCode=ForgetPasswordPost`, {}).subscribe(
        res => {
          // console.log('')res', res);
          this.translate.get('Code Sent Successfully!').subscribe(word => {
            this.toastr.success(word);
          });
          this.router.navigate(['/auth/confirm-otp'], {queryParams: {isForgetPass: true}});
        }, error => {
          // console.log('')err', error)
          // this.toastr.error(HandleResponseError(error));
          this.loadSubmitBtn = false;
        }
      )
    } else {
      this.loadSubmitBtn = false;
    }
  }

  validatePhone(str) {
    const re = /^[569]\d{7}$/;
    return re.test(str)
  }

  validateEmail(str) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(str)
  }

}
