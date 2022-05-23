import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ToastrService} from 'ngx-toastr';
import {Route, Router} from '@angular/router';
import {environment} from "../../../../environments/environment";
import {ConfirmedValidator, GetLanguage, HandleResponseError} from "../../../shared/functions/shared-functions";
import {AuthService} from "../../../services/auth.service";
import {PageTitleService} from "../../../core/page-title/page-title.service";
import {CoreService} from "../../../services/core.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  nationalities = [
    {value: 'EG', viewValue: 'Egyptian'},
  ];
  siteKey = environment.captchaSiteKey;
  mainLogo = environment.mainLogo;
  language = GetLanguage();
  constructor(private fb: FormBuilder,
              public authService: AuthService,
              public coreService: CoreService,
              private pageTitleService: PageTitleService,
              private toastr: ToastrService,
              private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
        fname: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
        sname: [null, Validators.maxLength(50)],
        tname: [null, Validators.maxLength(50)],
        lname: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
        email: [null, Validators.compose([Validators.required, CustomValidators.email])],
        phone: [null, Validators.compose([Validators.required])],
        civicNumber: [null, Validators.compose([Validators.required])],
        passport: [null, Validators.compose([Validators.required])],
        // gender: ['male', Validators.required],
        recaptcha: [null, Validators.compose([Validators.required])],
        terms: [null, Validators.requiredTrue],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      {validators: [ConfirmedValidator('password', 'confirmPassword')]});
  }

  register(value) {
    // console.log('')value', value);
    if (value.sname?.trim() === '' || !value.sname) {
      value.sname = '-';
    }
    if (value.tname?.trim() === '' || !value.tname) {
      value.tname = '-';
    }
    const body = {
      auditPageCode: 'FOCreateAccount',
      firstName: value.fname?.trim(),
      socondName: value.sname.trim(),
      thirdName: value.tname.trim(),
      familyName: value.lname.trim(),
      phone: value.phone,
      email: value.email,
      civilId: value.civicNumber,
      passportNumber: value.passport,
      password: value.password,
    }
    this.coreService.postRequest('User/Register', body).subscribe(
      res => {
        // console.log('')res', res);
        if (res.messageArEng) {
          this.toastr.error(HandleResponseError(res));
        } else {
          // this.authService.setLocalUserProfile(res);
          // this.authService.setToken(res.token);
          // this.addUserToRole(res);
          this.translate.get('Successfully Signed Up!').subscribe(word => {
            this.toastr.success(word);
          });
          this.router.navigate(['/auth/confirm-otp']);
          // if(res.isActive === false) {
          //     this.toastr.error('Please go to mail & activate your account')
          // }
        }

      }, error => {
        // console.log('')err', error)
        // this.toastr.error(HandleResponseError(error));
      }
    )
  }

  addUserToRole(data) {
    const body = {
      UserId: data?.id,
      RoleId: 358,
    }
    this.coreService.postRequest(`User/AddUserRole?UserId=${body.UserId}&RoleId=${body.RoleId}`, body).subscribe(res => {
    }, err => {
      // this.toastr.error(HandleResponseError(error))
    });
  }

  handleReset() {
    console.log('reset', GetLanguage())
  }

  handleReady() {
    console.log('ready', GetLanguage());
  }

  handleLoad(captchaElem) {
    console.log('load', captchaElem);
    this.language = null;
    this.language = GetLanguage();
  }

  handleSuccess(event) {
    // console.log('')eve', event)
    if (event) {
    }
  }
}



