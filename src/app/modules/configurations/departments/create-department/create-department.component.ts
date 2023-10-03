import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {AutoComplete} from "../../../../shared/auto-complete";
import {TranslateService} from "@ngx-translate/core";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HandleResponseError} from "../../../../shared/functions/shared-functions";
import {ToastrService} from "ngx-toastr";

@UntilDestroy()
@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent extends AutoComplete implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private coreService: CoreService,
              private translateService: TranslateService) {
    super()
  }

  department;
  department_id;
  managers = [
    {
      name: 'Samy',
      id: 1,
    },
    {
      name: 'Ahmed',
      id: 2,
    }
  ];
  managersFilteredOptions: Observable<any[]>;
  // employees = [
  //   {
  //     name: 'ahmed',
  //     id: 1
  //   },
  //   {
  //     name: 'Ali',
  //     id: 2
  //   },
  //   {
  //     name: 'Ola',
  //     id: 3
  //   },{
  //     name: 'Sama',
  //     id: 4
  //   },
  // ]
  ngOnInit(): void {
    this.department = this.activatedRoute.snapshot.data['department']?.data;
    this.managers = this.activatedRoute.snapshot.data['users']?.data;
    this.form = this.fb.group({
        name_en: ['', Validators.compose([Validators.required])],
        name_ar: ['', Validators.compose([Validators.required])],
        // employees: ['', Validators.compose([Validators.required])],
        manager: [null, Validators.compose([])],
      },
      {validators: [this.checkAutoComplete()]}
    );
    this.department_id = this.activatedRoute.snapshot.data['department']?.data?.id;
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.handlerAutocomplete('manager');
    if (this.department_id) {
      this.fillForm();
    }
    this.fillForm();
    console.log('this.data', this.department);
  }

  fillForm() {
    this.form.controls['name_ar'].setValue(this.department?.name_ar);
    this.form.controls['name_en'].setValue(this.department?.name_en);
    // this.form.controls['employees'].setValue(this.data?.employees);
    this.form.controls['manager'].setValue(this.managers.find(x => x.id === this.department?.manager_id));
  }

  handlerAutocomplete(type) {
    if (type === 'manager') {
      this.managersFilteredOptions = this.form.controls['manager']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.managers) : this.managers.slice())),
      );
    }
  }

  checkAutoComplete() {
    return (formGroup: FormGroup) => {
      const manager = formGroup?.controls['manager'];
      //////////////////////////////////////////////////////////////
      const indexManager = this.managers?.findIndex(res => res === manager.value);

      if (indexManager === -1 && manager.value) {
        manager.setErrors({wrong: true});
      } else {
        manager.setErrors(null);
      }
    }

  }

  save(value) {
    if (!this.form.valid) {
      this.form?.markAllAsTouched();
    } else {
      var data = new FormData();
      data.append("name_en", this.form.value.name_en);
      data.append("name_ar", this.form.value.name_ar);
      data.append("manager_id", this.form.value.manager?.id);
      console.log('body', data)
      if (!this.department_id) {
        this.coreService.postRequest('console/customers_departments', data).pipe(untilDestroyed(this)).subscribe(res => {
          this.form.reset();
          this.form.markAsUntouched();
          this.form.markAsPristine();
          this.form.setErrors(null);
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/configurations/departments']);
        })
      } else {
        this.coreService.postRequest(`console/customers_departments/${this.department_id}`, data).pipe(untilDestroyed(this)).subscribe(res => {
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/configurations/departments']);
        })
      }
    }
  }


}
