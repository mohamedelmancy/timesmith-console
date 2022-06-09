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
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initialize();
  }

  initialize() {
      console.log('selectedEvent', this.selectedEvent);
      this.data = this.selectedEvent;
      this.form = this.fb.group({
          type: ['', Validators.compose([])],
          dateFrom: ['', Validators.compose([])],
          dateTo: ['', Validators.compose([])],
        },
        {validators: [this.checkAutoComplete()]}
      );
      this.handlerAutocomplete('type');
      if (this.data?.title || this.data?.extendedProps?.excepTitle) {
      this.types.push({
        name: (this.data?.title || this.data?.extendedProps?.excepTitle),
        id: Math.random()
      });
      if (this.data) {
        this.form.controls['type'].setValue(this.types.find(x => x.name === (this.data?.title || this.data?.extendedProps?.excepTitle)))
        this.form.controls['dateFrom'].setValue(moment(this.data?.start).format('HH:MM A'))
        this.form.controls['dateTo'].setValue(moment(this.data?.end).format('HH:MM A'))
      }
    }
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
      const start = `${this.data.startStr.split('T')[0]}T${this.form.value.dateFrom.split(' ')[0]}`
      const end = `${this.data.endStr.split('T')[0]}T${this.form.value.dateTo.split(' ')[0]}`
      this.emittedData.emit({form: this.form.value, start, end});
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
    // if (type === 'start') {
    //   this.form.controls['dateFrom'].setValue(e);
    // } else {
    //   this.form.controls['dateTo'].setValue(e);
    // }
    // this.emittedData.emit(this.form.value)
  }

}
