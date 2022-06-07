import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import moment from "moment";
import {AutoComplete} from "../../../../shared/auto-complete";
import {CoreService} from "../../../../services/core.service";
import {GetLanguage} from "../../../../shared/functions/shared-functions";


@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent extends AutoComplete implements OnInit, OnChanges {
  form: FormGroup;
  language = GetLanguage();
  @Input() selectedEvent: any;
  @Output() emittedData = new EventEmitter<any>();
  typesFilteredOptions: Observable<any[]>;
  employeesFilteredOptions: Observable<any[]>;
  data;
  types = [
    {
      name: 'Attendance',
      id: 1
    },
    {
      name: 'Permission',
      id: 2
    },
    {
      name: 'Leave',
      id: 3
    },
  ];

  constructor(private coreService: CoreService,
              private fb: FormBuilder) {
    super()
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initialize();
  }

  initialize() {
      console.log('selectedEvent', this.selectedEvent);
      if (this.selectedEvent) {
        const d = JSON.stringify(this.selectedEvent);
        this.data = JSON.parse(d);
      }
      this.form = this.fb.group({
          type: ['', Validators.compose([])],
          dateFrom: [new Date(this.data?.start), Validators.compose([])],
          dateTo: [new Date(this.data?.end), Validators.compose([])],
        },
        {validators: [this.checkAutoComplete()]}
      );
      this.handlerAutocomplete('type');
      if (this.data?.title) {
      this.types.push({
        name: this.data?.title,
        id: Math.random()
      });
      this.form.controls['type'].setValue(this.types.find(x => x.name === this.data?.title))
    }
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes)
      this.emittedData.emit(this.form.value);
    })
    console.log('eee', this.data);
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
      // const type = formGroup?.controls['type'];
      // //////////////////////////////////////////////////////////////
      // const indexType = this.types.findIndex(res => res === type.value);
      // // const indexStatus = this.districtsOptions.findIndex(res => res === status.value);
      // if (indexType === -1) {
      //   type.setErrors({wrong: true});
      // } else {
      //   type.setErrors(null);
      // }
    }

  }


  save(value) {
    console.log('save', value)
    // this.dialogRef.close({data: value, event: this.data.event});
  }


  changeDate(e, type) {
    console.log('e', e);
    if (type === 'start') {
      this.form.controls['dateFrom'].setValue(e);
    } else {
      this.form.controls['dateTo'].setValue(e);
    }
    this.emittedData.emit(this.form.value)
  }

}
