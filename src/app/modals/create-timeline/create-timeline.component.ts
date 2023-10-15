import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CoreService} from "../../services/core.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AutoComplete} from "../../shared/auto-complete";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {GetLanguage} from "../../shared/functions/shared-functions";
import {MultiselectDropdown} from "../../../assets/js/multiselect-dropdown";

@UntilDestroy()
@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrls: ['./create-timeline.component.scss']
})
export class CreateTimelineComponent extends AutoComplete implements OnInit {
  form: FormGroup;
  typesFilteredOptions: Observable<any[]>;
  employeesFilteredOptions: Observable<any[]>;
  departmentsFilteredOptions: Observable<any[]>;
  sitesFilteredOptions: Observable<any[]>;
  employees = []
  types = [
    {
      name: 'Attendance',
      id: 1
    },
    {
      name: 'Exception code',
      id: 2
    },
    {
      name: 'Leave',
      id: 3
    },
  ];
  departments = [];
  sites = [];

  constructor(public dialogRef: MatDialogRef<CreateTimelineComponent>,
              private coreService: CoreService,
              private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,) {
    super()
  }

  ngOnInit(): void {
    setTimeout(() => {
      MultiselectDropdown({});
    }, 1000)
    this.getDepartments();
    this.getSites();
    this.getTeamMembers();
    this.form = this.fb.group({
        department: new FormControl(null, []),
        site: new FormControl(null, []),
        employees: ['', Validators.compose([Validators.required])],
        type: ['', Validators.compose([Validators.required])],
        dateFrom: [this.data?.event.start, Validators.compose([Validators.required])],
        dateTo: [this.data?.event.end, Validators.compose([Validators.required])],
      },
      {validators: [this.checkAutoComplete()]}
    );
    this.handlerAutocomplete('department');
    this.handlerAutocomplete('site');
    this.handlerAutocomplete('type');

    if (this.data?.event?.title) {
      this.types.push({
        name: this.data?.event.title,
        id: Math.random()
      });
      this.form.controls['type'].setValue(this.types.find(x => x.name === this.data?.event.title))
      this.form.controls['employees'].setValue(this.data.employees.find(x => x.id === this.data?.event._def.resourceIds[0]))
    }
    console.log('eee', this.data);
  }

  getDepartments() {
    this.coreService.getRequest('console/customers_departments').pipe(untilDestroyed(this)).subscribe(res => {
      this.departments = res?.data;
      this.departments.forEach((item: any) => {
        item['individuals'] = item.employees?.length;
        item.name = GetLanguage() === 'ar' ? item?.name_ar : item?.name_en;
      });
      this.handlerAutocomplete('department');
    })
  }

  getSites() {
    this.coreService.getRequest('console/customers_sites').pipe(untilDestroyed(this)).subscribe(res => {
      this.sites = res?.data;
      this.sites.forEach((item: any) => {
        item.name = GetLanguage() === 'ar' ? item?.name_ar : item?.name_en;
      });
      this.handlerAutocomplete('site');
    })
  }

  getTeamMembers() {
    this.coreService.getRequest('users').pipe(untilDestroyed(this)).subscribe(res => {
      this.employees = res?.data;
      this.employees.forEach((item: any) => {
      });
    })
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
    } else if (type === 'type') {
      this.typesFilteredOptions = this.form.controls['type']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.types) : this.types.slice())),
      );
    }
  }

  checkAutoComplete() {
    return (formGroup: FormGroup) => {
      const type = formGroup?.controls['type'];
      const department = formGroup?.controls['department'];
      const site = formGroup?.controls['site'];
      //////////////////////////////////////////////////////////////
      const indexDep = this.departments.findIndex(res => res === department.value);
      const indexSite = this.sites.findIndex(res => res === site.value);
      const indexType = this.types.findIndex(res => res === type.value);
      // const indexStatus = this.districtsOptions.findIndex(res => res === status.value);
      if (indexDep === -1 && department.value) {
        department.setErrors({wrong: true});
      } else {
        department.setErrors(null);
      }
      if (indexSite === -1 && site.value) {
        site.setErrors({wrong: true});
      } else {
        site.setErrors(null);
      }
      if (indexType === -1) {
        type.setErrors({wrong: true});
      } else {
        type.setErrors(null);
      }
    }

  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  save(value) {
    console.log('save', value)
    this.dialogRef.close({data: value, event: this.data.event});
  }

}
