import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {AutoComplete} from "../../../../shared/auto-complete";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HandleResponseError} from "../../../../shared/functions/shared-functions";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import moment from "moment";
import {numberRegex, primaryColor, ServerFormat} from "../../../../shared/variables/variables";

@UntilDestroy()
@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.scss']
})
export class CreateLeaveComponent extends AutoComplete implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private coreService: CoreService,
              private translateService: TranslateService) {
    super();
  }

  leave;
  leave_id;
  types = [
    {
      name: 'Public Holiday',
      id: 1,
    },
    {
      name: 'Legal',
      id: 2,
    },
  ];
  typesFilteredOptions: Observable<any[]>;
  ngOnInit(): void {
    this.leave = this.activatedRoute.snapshot.data['leave']?.data;
    this.form = this.fb.group({
        name_en: ['', Validators.compose([Validators.required])],
        name_ar: ['', Validators.compose([Validators.required])],
        type: ['', Validators.compose([Validators.required])],
        balance: ['', Validators.compose([Validators.pattern(numberRegex)])],
        start: [null, Validators.compose([Validators.required])],
        end: [null, Validators.compose([Validators.required])],
        color: [primaryColor, Validators.compose([Validators.required])],
      },
      {validators: [this.checkAutoComplete()]}
    );
    this.leave_id = this.activatedRoute.snapshot.data['leave']?.data?.id;
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.handlerAutocomplete('type');
    if (this.leave_id) {
      this.fillForm();
    }
    console.log('this.data', this.leave);
  }

  handlerAutocomplete(type) {
    if (type === 'type') {
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
      //////////////////////////////////////////////////////////////
      const indexType = this.types.findIndex(res => res === type.value);

      if (indexType === -1 && type.value) {
        type.setErrors({wrong: true});
      } else {
        type.setErrors(null);
      }
    }

  }

  fillForm() {
    this.form.controls['name_ar'].setValue(this.leave?.name_ar);
    this.form.controls['name_en'].setValue(this.leave?.name_en);
    this.form.controls['type'].setValue(this.types.find(x => x.id === this.leave?.leave_type));
    this.form.controls['balance'].setValue(this.leave?.balance);
    this.form.controls['start'].setValue(this.leave?.start_date);
    this.form.controls['end'].setValue(this.leave?.end_date);
    this.form.controls['color'].setValue(this.leave?.color);
  }

  save(value) {
    if (!this.form.valid) {
      this.form?.markAllAsTouched();
    } else {
      var data = new FormData();
      data.append("name_en", this.form.value.name_en);
      data.append("name_ar", this.form.value.name_ar);
      data.append("leave_type", this.form.value.type?.id);
      data.append("balance", this.form.value.balance);
      data.append("start_date", moment(this.form.value.start).format(ServerFormat));
      data.append("end_date", moment(this.form.value.end).format(ServerFormat));
      data.append("color", this.form.value.color);

      console.log('body', data)
      if (!this.leave_id) {
        this.coreService.postRequest('console/customers_leaves', data).pipe(untilDestroyed(this)).subscribe(res => {
          this.form.reset();
          this.form.markAsUntouched();
          this.form.markAsPristine();
          this.form.setErrors(null);
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/configurations/leaves']);
        })
      } else {
        this.coreService.postRequest(`console/customers_leaves/${this.leave_id}`, data).pipe(untilDestroyed(this)).subscribe(res => {
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/configurations/leaves']);
        })
      }
    }
  }


}
