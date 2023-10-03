import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../services/core.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AutoComplete} from "../../../shared/auto-complete";
import {ConfirmedValidator, HandleListName, HandleResponseError} from "../../../shared/functions/shared-functions";
import {primaryColor} from "../../../shared/variables/variables";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@UntilDestroy()
@Component({
  selector: 'app-create-individual',
  templateUrl: './create-individual.component.html',
  styleUrls: ['./create-individual.component.scss']
})
export class CreateIndividualComponent extends AutoComplete implements OnInit {
  form: FormGroup;
  primaryColor = primaryColor

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private coreService: CoreService,
              private translateService: TranslateService) {
    super()
  }

  hidePass = true;
  hideConfirmPass = true;
  acceptedAvatarFileTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/svg'
  ];
  avatarSrc: any;
  avatarFile;
  team;
  team_id;
  departmentsFilteredOptions: Observable<any[]>;
  sitesFilteredOptions: Observable<any[]>;
  rolesFilteredOptions: Observable<any[]>;
  organizationFilteredOptions: Observable<any[]>;
  shiftsFilteredOptions: Observable<any[]>;
  shifts = []
  departments = [];
  sites = [];
  roles = [
    {
      name: 'SuperAdmin',
      id: 1
    },
    {
      name: 'Admin',
      id: 3
    },
    {
      name: 'Manager',
      id: 2
    },
    {
      name: 'User',
      id: 4
    },

  ];
  organizations = [];

  ngOnInit(): void {
    this.team = this.activatedRoute.snapshot.data['team']?.data;
    this.departments = HandleListName(this.activatedRoute.snapshot.data['departments']?.data);
    this.sites = HandleListName(this.activatedRoute.snapshot.data['sites']?.data);
    this.shifts = HandleListName(this.activatedRoute.snapshot.data['shifts']?.data);
    this.organizations = HandleListName(this.activatedRoute.snapshot.data['organizations']?.data);
    this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([])],
        confirmPassword: ['', Validators.compose([])],
        department: ['', Validators.compose([Validators.required])],
        site: ['', Validators.compose([Validators.required])],
        shift: ['', Validators.compose([Validators.required])],
        avatar: ['', Validators.compose([])],
        mobile: [null, Validators.compose([])],
        punchAnyWhere: [null, Validators.compose([])],
        autoPunch: [null, Validators.compose([])],
        connected: [null, Validators.compose([])],
        calling_code: [null, Validators.compose([])],
        organization: [null, Validators.compose([])],
        role: [null, Validators.compose([Validators.required])],
        username: [null, Validators.compose([])],
      },
      {validators: [this.checkAutoComplete(), !this.team_id && ConfirmedValidator('password', 'confirmPassword')]}
    );
    this.team_id = this.activatedRoute.snapshot.data['team']?.data?.id;
    this.handlerAutocomplete('department');
    this.handlerAutocomplete('site');
    this.handlerAutocomplete('shift');
    this.handlerAutocomplete('role');
    this.handlerAutocomplete('organization');
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    if (this.team) {
      this.fillForm();
    } else {
      this.form.controls['password'].setValidators([Validators.required]);
      this.form.controls['confirmPassword'].setValidators([Validators.required]);
    }
    console.log('this.data', this.team);
  }

  fillForm() {
    if (this.team?.avatar) {
      this.avatarSrc = this.team?.avatar;
    }
    this.form.controls['name'].setValue(this.team?.name);
    this.form.controls['avatar'].setValue(this.team?.avatar);
    this.form.controls['username'].setValue(this.team?.username);
    this.form.controls['connected'].setValue(this.team?.is_connected === 1);
    this.form.controls['punchAnyWhere'].setValue(this.team?.punch_anywhere === 1);
    this.form.controls['autoPunch'].setValue(this.team?.auto_punch === 1);
    this.form.controls['mobile'].setValue(this.team?.mobile);
    this.form.controls['department'].setValue(this.departments.find(x => x.id === this.team?.department_id));
    this.form.controls['site'].setValue(this.sites.find(x => x.id === this.team?.site_id));
    this.form.controls['shift'].setValue(this.shifts.find(x => x.id === this.team?.shift_id));
    this.form.controls['organization'].setValue(this.organizations.find(x => x.id === this.team?.organization_id));
    this.form.controls['role'].setValue(this.roles.find(x => x.id === this.team?.role_id));
  }

  handlerAutocomplete(type) {
    if (type === 'department') {
      this.departmentsFilteredOptions = this.form.controls['department']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.departments) : this.departments.slice())),
      );
    } else if (type === 'site') {
      this.sitesFilteredOptions = this.form.controls['site']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.sites) : this.sites.slice())),
      );
    } else if (type === 'shift') {
      this.shiftsFilteredOptions = this.form.controls['shift']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.shifts) : this.shifts.slice())),
      );
    } else if (type === 'role') {
      this.rolesFilteredOptions = this.form.controls['role']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.roles) : this.roles.slice())),
      );
    } else if (type === 'organization') {
      this.organizationFilteredOptions = this.form.controls['organization']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.organizations) : this.organizations?.slice())),
      );
    }

  }

  checkAutoComplete() {
    return (formGroup: FormGroup) => {
      const department = formGroup?.controls['department'];
      const shift = formGroup?.controls['shift'];
      const site = formGroup?.controls['site'];
      const role = formGroup?.controls['role'];
      const organization = formGroup?.controls['organization'];
      //////////////////////////////////////////////////////////////
      const indexDep = this.departments?.findIndex(res => res === department?.value);
      const indexShift = this.shifts?.findIndex(res => res === shift?.value);
      const indexSite = this.sites?.findIndex(res => res === site?.value);
      const indexRole = this.roles?.findIndex(res => res === role?.value);
      const indexOrganization = this.organizations?.findIndex(res => res === organization?.value);
      if (indexDep === -1 && department?.value) {
        department.setErrors({wrong: true});
      } else {
        department.setErrors(null);
      }
      if (indexShift === -1 && shift?.value) {
        shift.setErrors({wrong: true});
      } else {
        shift.setErrors(null);
      }
      if (indexSite === -1 && site?.value) {
        site.setErrors({wrong: true});
      } else {
        site.setErrors(null);
      }
      if (indexRole === -1 && role?.value) {
        role.setErrors({wrong: true});
      } else {
        role.setErrors(null);
      }
      if (indexOrganization === -1 && organization?.value) {
        organization.setErrors({wrong: true});
      } else {
        organization.setErrors(null);
      }
    }

  }

  save(value) {
    if (!this.form.valid) {
      this.form?.markAllAsTouched();
    } else {
      var data = new FormData();
      data.append("name", this.form?.value.name);
      data.append("organization_id", this.form?.value.organization?.id);
      data.append("department_id", this.form?.value.department?.id);
      data.append("site_id", this.form?.value.site?.id);
      data.append("shift_id", this.form?.value.shift?.id);
      data.append("mobile", this.form?.value.mobile);
      data.append("calling_code", `+${this.form?.value.calling_code}`);
      data.append("full_mobile_number", `+${this.form?.value.calling_code}${this.form?.value.mobile}`);
      data.append("punch_anywhere", this.form?.value.punchAnyWhere ? '1' : '2');
      data.append("auto_punch", this.form?.value.autoPunch ? '1' : '2');
      data.append("username", this.form?.value.username);
      data.append("is_connected", this.form?.value.connected ? '1' : '2');
      data.append("role_id", this.form?.value.role?.id);

      console.log('body', data)
      if (!this.team_id) {
        data.append("password", this.form?.value.password);
        this.coreService.postRequest('users', data).pipe(untilDestroyed(this)).subscribe(res => {
          this.form.reset();
          this.form.markAsUntouched();
          this.form.markAsPristine();
          this.form.setErrors(null);
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/team']);
        })
      } else {
        this.coreService.putRequest(`users/${this.team_id}`, data).pipe(untilDestroyed(this)).subscribe(res => {
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/team']);
        })
      }
    }
  }

  changedPhone(phone) {
    if (phone) {
      console.log('phone', phone)
      this.form.controls['mobile'].setValue(phone?.phoneNumber?.replaceAll(' ', ''));
      this.form.controls['calling_code'].setValue(phone.dialCode);
    }
  }

  removeAvatar() {
    this.avatarFile = void 0;                      // clear locally uploaded file
    this.avatarSrc = void 0;                       // clear previewed image source
  }

  onAvatarSelect(event) {
    event.preventDefault();
    // this.removeAvatar();
    if (event.target.files[0]) {
      for (let type of this.acceptedAvatarFileTypes) {
        if (event.target.files[0].type === type) {                        // check if file type is acceptable
          if (event.target.files[0].size <= 2097152) {                    // check if file size is acceptable
            this.avatarFile = event.target.files[0];                      // update file variable
            this.avatarSrc = void 0;                                      // clear current previewed image src
            const reader = new FileReader();                              // a built-in object to let the application read the contents of an avatarFile
            const _this = this;                                 // add a reference to the component to be called inside the reader functions
            reader.addEventListener('load', function () {   // update previewed image source on reader reload
              _this.avatarSrc = reader.result;
            }, false);
            reader.readAsDataURL(this.avatarFile);                        // reload reader with a new file
            // this.avatarRequirementsError = void 0;
            return;
          } else {
            this.form?.controls['avatar'].setErrors({invalidFile: true})
          }
        }
      }
    }
  }

  inputFocused(e) {
    console.log('e', e.target?.value)
  }

  checkDimentions(event) {
    if (event.srcElement.naturalHeight < 64 || event.srcElement.naturalHeight < 64) {
      this.removeAvatar();
      this.form?.controls['avatar'].setErrors({dimentions: true})
    }
  }

}
