import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../services/core.service";
import {secureStorage} from "../../../shared/functions/secure-storage";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AutoComplete} from "../../../shared/auto-complete";
import {ConfirmedValidator} from "../../../shared/functions/shared-functions";
import {primaryColor} from "../../../shared/variables/variables";

@Component({
  selector: 'app-create-individual',
  templateUrl: './create-individual.component.html',
  styleUrls: ['./create-individual.component.scss']
})
export class CreateIndividualComponent extends AutoComplete implements OnInit {
  form: FormGroup;
  primaryColor =  primaryColor
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) {
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
  data;
  departmentsFilteredOptions: Observable<any[]>;
  sitesFilteredOptions: Observable<any[]>;
  managersFilteredOptions: Observable<any[]>;
  rolesFilteredOptions: Observable<any[]>;
  shiftsFilteredOptions: Observable<any[]>;
  shifts  = [
    {
      name: 'Shift1',
      id: 1,
    },
    {
      name: 'Shift2',
      id: 2,
    }
  ]
  managers  = [
    {
      name: 'Samy',
      id: 1,
    },
    {
      name: 'Ahmed',
      id: 2,
    }
  ]
  departments = [
    {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    },

  ];
  sites = [
    {
      name: 'Site1',
      id: 1
    },
    {
      name: 'Site2',
      id: 2
    },

  ];
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
  ngOnInit(): void {
    this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', Validators.compose([Validators.required])],
        department: ['', Validators.compose([Validators.required])],
        site: ['', Validators.compose([Validators.required])],
        shift: ['', Validators.compose([Validators.required])],
        avatar: ['', Validators.compose([])],
        manager: [null, Validators.compose([])],
        mobile: [null, Validators.compose([])],
        punchAnyWhere: [null, Validators.compose([])],
        autoPunch: [null, Validators.compose([])],
        connected: [null, Validators.compose([])],
        role: [null, Validators.compose([Validators.required])],
      },
      {validators: [this.checkAutoComplete(), ConfirmedValidator('password', 'confirmPassword')]}
    );

    this.handlerAutocomplete('department');
    this.handlerAutocomplete('site');
    this.handlerAutocomplete('shift');
    this.handlerAutocomplete('manager');
    this.handlerAutocomplete('role');
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.data = this.activatedRoute.snapshot.data['team'];
    this.data = secureStorage.getItem('row');
    if (this.data) {
      // this.fillForm();
    }
    console.log('this.data', this.data);
  }

  fillForm() {
    this.form.controls['name'].setValue(this.data?.name);
    this.form.controls['avatar'].setValue(this.data?.avatar);
    this.form.controls['password'].setValue(this.data?.password);
    this.form.controls['punchAnyWhere'].setValue(this.data?.punchAnyWhere);
    this.form.controls['autoPunch'].setValue(this.data?.autoPunch);
    this.form.controls['mobile'].setValue(this.data?.mobile);
    this.form.controls['department'].setValue(this.departments.find(x => x.id === this.data?.department?.id));
    this.form.controls['site'].setValue(this.sites.find(x => x.id === this.data?.site?.id));
    this.form.controls['shift'].setValue(this.shifts.find(x => x.id === this.data?.shift?.id));
    this.form.controls['manager'].setValue(this.managers.find(x => x.id === this.data?.manager?.id));
    this.form.controls['role'].setValue(this.managers.find(x => x.id === this.data?.manager?.id));
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
    } else if (type === 'manager') {
      this.managersFilteredOptions = this.form.controls['manager']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.managers) : this.managers.slice())),
      );
    } else if (type === 'role') {
      this.rolesFilteredOptions = this.form.controls['role']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.roles) : this.roles.slice())),
      );
    }
  }

  checkAutoComplete() {
    return (formGroup: FormGroup) => {
      const department = formGroup?.controls['department'];
      const shift = formGroup?.controls['shift'];
      const site = formGroup?.controls['site'];
      const manager = formGroup?.controls['manager'];
      const role = formGroup?.controls['role'];
      //////////////////////////////////////////////////////////////
      const indexDep = this.departments.findIndex(res => res === department.value);
      const indexShift = this.shifts.findIndex(res => res === shift.value);
      const indexSite = this.sites.findIndex(res => res === site.value);
      const indexManager = this.managers.findIndex(res => res === manager.value);
      const indexRole = this.roles.findIndex(res => res === role.value);
      if (indexDep === -1 && department.value) {
        department.setErrors({wrong: true});
      } else {
        department.setErrors(null);
      }
      if (indexShift === -1  && shift.value) {
        shift.setErrors({wrong: true});
      } else {
        shift.setErrors(null);
      }
      if (indexSite === -1  && site.value) {
        site.setErrors({wrong: true});
      } else {
        site.setErrors(null);
      }
      if (indexManager === -1  && manager.value) {
        manager.setErrors({wrong: true});
      } else {
        manager.setErrors(null);
      }
      if (indexRole === -1  && role.value) {
        role.setErrors({wrong: true});
      } else {
        role.setErrors(null);
      }
    }

  }

  save(value) {

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
    console.log('e', e.target.value)
  }

  checkDimentions(event) {
    if (event.srcElement.naturalHeight < 64 || event.srcElement.naturalHeight < 64) {
      this.removeAvatar();
      this.form?.controls['avatar'].setErrors({dimentions: true})
    }
  }

}
