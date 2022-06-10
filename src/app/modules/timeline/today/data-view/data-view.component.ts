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
  @Input() exceptionCodes: any;
  @Input() leaves: any;
  @Output() emittedData = new EventEmitter<any>();
  @Output() removeEvent = new EventEmitter<any>();
  typesFilteredOptions: Observable<any[]>;
  employeesFilteredOptions: Observable<any[]>;
  data;
  types = [
    // {
    //   name: 'Attendance',
    //   title: 'Attendance',
    //   id: 1,
    //   color: '#09706c'
    // },
    // {
    //   name: 'Permission',
    //   title: 'Permission',
    //   id: 2,
    //   color: '#d0052a'
    // },
    // {
    //   name: 'Leave',
    //   title: 'Leave',
    //   id: 3,
    //   color: '#653d08'
    // },
  ];
  changed = false;
  constructor(private coreService: CoreService,
              private fb: FormBuilder) {
    super()
  }

  ngOnInit(): void {
    this.handleTypes();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = this.selectedEvent;
    this.handleTypes();
    this.initialize();
  }

  initialize() {
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
        title: (this.data?.title || this.data?.extendedProps?.excepTitle),
        id: Math.random(),
        color: '#d0052a',
      });
      if (this.data) {
        this.form.controls['type'].setValue(this.types.find(x => x.name === (this.data?.title || this.data?.extendedProps?.excepTitle)))
        this.form.controls['dateFrom'].setValue(moment(this.data?.start).format('hh:mm A'))
        this.form.controls['dateTo'].setValue(moment(this.data?.end).format('hh:mm A'))
      }
    }
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
      this.changed = true;
    })
  }

  handleTypes() {
    this.types = [];
    if (this.data?.extendedProps?.html) {
      this.exceptionCodes?.forEach(code => {
        code.name = code.title;
        this.types.push(code);
      })
    } else {
      this.leaves?.forEach(leave => {
        leave.name = leave.title;
        this.types.push(leave);
      })
    }
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
    const start = `${this.data.startStr.split('T')[0]}T${this.form.value.dateFrom.split(' ')[0]}`
    const end = `${this.data.endStr.split('T')[0]}T${this.form.value.dateTo.split(' ')[0]}`
    this.emittedData.emit({form: this.form.value, start, end, event: this.data});
    this.changed = false;
  }

  remove(value) {
    console.log('remove', value)
    this.removeEvent.emit(this.data);
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
