
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PageTitleService} from '../../../core/page-title/page-title.service';
import {AuthService} from "../../../services/auth.service";
import {CoreService} from "../../../services/core.service";
import {ConfirmedValidator, GetCurrentUser} from "../../../shared/functions/shared-functions";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  mainLogo = environment.mainLogo;
  form: FormGroup;
  constructor(public authService: AuthService,
              private toastr: ToastrService,
              public translate: TranslateService,
              public router: Router,
              private coreService: CoreService,
              private fb: FormBuilder,
              public pageTitleService: PageTitleService,
              private translateService: TranslateService
  ) {
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.pageTitleService.setTitle('Change Password');
    }, 0);
    this.form = this.fb.group({
        oldPass: ['', [Validators.required]],
        newPass: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      {validators: [ConfirmedValidator('newPass', 'confirmPassword')]});
  }

  /**
   * send method is used to send a reset password link into your email.
   */
  send(value) {
    // console.log('')value', value);
    const body = {
      UserId: GetCurrentUser()?.id,
      OldPassword: this.form.value.oldPass,
      NewPassword: this.form.value.newPass,
      auditPageCode: 'ChangePassword'
    }
    // console.log(body)
    this.coreService.postRequest('User/ChangePassword', body).subscribe(
      res => {
        // console.log('')res', res);
        this.translateService.get('Password changed!').subscribe(word => {
          this.toastr.success(word);
        })
        this.router.navigate(['/auth/success-change-password'])
      }, error => {
        // console.log('')err', error)
        // this.toastr.error(HandleResponseError(error));
      }
    )
  }
}
