import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {TranslateService} from "@ngx-translate/core";
import {MultiselectDropdown} from "../../../../../assets/js/multiselect-dropdown";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HandleResponseError} from "../../../../shared/functions/shared-functions";
import {ToastrService} from "ngx-toastr";

@UntilDestroy()
@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.scss']
})
export class CreateShiftComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private coreService: CoreService,
              private translateService: TranslateService) {
  }

  shift;
  shift_id;
  disabled = false;
  noDataAvailText: string = this.translateService.instant('No data available');
  weekends = [
    {
      name: 'Saturday',
      id: 1
    },
    {
      name: 'Sunday',
      id: 2
    },
    {
      name: 'Monday',
      id: 3
    }, {
      name: 'Tuesday',
      id: 4
    }, {
      name: 'Wednesday',
      id: 5
    }, {
      name: 'Thursday',
      id: 6
    }, {
      name: 'Friday',
      id: 7
    },
  ]

  ngOnInit(): void {
    this.shift = this.activatedRoute.snapshot.data['shift']?.data;
    setTimeout(() => {
      MultiselectDropdown({});
    }, 1000)
    this.form = this.fb.group({
        name_en: ['', Validators.compose([Validators.required])],
        name_ar: ['', Validators.compose([Validators.required])],
        weekends: ['', Validators.compose([Validators.required])],
        from: [null, Validators.compose([Validators.required])],
        to: [null, Validators.compose([Validators.required])],
      },
      {validators: []}
    );
    this.shift_id = this.activatedRoute.snapshot.data['shift']?.data?.id;
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    if (this.shift_id) {
      this.fillForm();
    }
    console.log('this.data', this.shift);
  }

  fillForm() {
    this.form.controls['name_ar'].setValue(this.shift?.name_ar);
    this.form.controls['name_en'].setValue(this.shift?.name_en);
    this.form.controls['from'].setValue(`${this.shift?.from}:00`);
    this.form.controls['to'].setValue(`${this.shift?.to}:00`);
    const weekdays = [];
    const days = this.shift.days.split(',');
    days.map((day, index) => {
      weekdays.push(day)
    });
    this.form.controls['weekends'].setValue(weekdays);
  }

  save(value) {
    if (!this.form.valid) {
      this.form?.markAllAsTouched();
    } else {
      var body = {
        name_en: this.form.value.name_en,
        name_ar: this.form.value.name_ar,
        from: Number(this.form.value.from.split(':')[0]),
        to: Number(this.form.value.to.split(':')[0]),
        days: this.form.value.weekends,
      }
      console.log('body', body)
      if (!this.shift_id) {
        this.coreService.postRequest('console/customers_shifts', body).pipe(untilDestroyed(this)).subscribe(res => {
          this.form.reset();
          this.form.markAsUntouched();
          this.form.markAsPristine();
          this.form.setErrors(null);
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/configurations/shifts']);
        })
      } else {
        this.coreService.postRequest(`console/customers_shifts/${this.shift_id}`, body).pipe(untilDestroyed(this)).subscribe(res => {
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/configurations/shifts']);
        })
      }
    }
  }


}
