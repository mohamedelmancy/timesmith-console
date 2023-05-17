import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {AutoComplete} from "../../../../shared/auto-complete";

@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.scss']
})
export class CreateLeaveComponent extends AutoComplete implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) {
    super();
  }
  data;
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
    this.form = this.fb.group({
        name_en: ['', Validators.compose([Validators.required])],
        name_ar: ['', Validators.compose([Validators.required])],
        type: ['', Validators.compose([Validators.required])],
        balance: ['', Validators.compose([])],
        start: [null, Validators.compose([Validators.required])],
        end: [null, Validators.compose([Validators.required])],
        color: [null, Validators.compose([Validators.required])],
      },
      {validators: [this.checkAutoComplete()]}
    );
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.handlerAutocomplete('type');
    this.data = this.activatedRoute.snapshot.data['leave'];
    this.data = secureStorage.getItem('row');
    this.fillForm();
    console.log('this.data', this.data);
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

      if (indexType === -1  && type.value) {
        type.setErrors({wrong: true});
      } else {
        type.setErrors(null);
      }
    }

  }

  fillForm() {
    this.form.controls['name_ar'].setValue(this.data?.name_ar);
    this.form.controls['name_en'].setValue(this.data?.name_en);
    this.form.controls['type'].setValue(this.types.find(x => x.name === this.data?.type));
    this.form.controls['balance'].setValue(this.data?.balance);
    this.form.controls['start'].setValue(new Date(this.data?.start));
    this.form.controls['end'].setValue(new Date(this.data?.end));
    this.form.controls['color'].setValue(this.data?.color);
  }

  save(value) {

  }

}
