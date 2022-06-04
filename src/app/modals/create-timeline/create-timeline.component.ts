import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CoreService} from "../../services/core.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AutoComplete} from "../../shared/auto-complete";
import moment from "moment";

@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrls: ['./create-timeline.component.scss']
})
export class CreateTimelineComponent extends AutoComplete implements OnInit {
  form: FormGroup;
  typesFilteredOptions: Observable<any[]>;
  employeesFilteredOptions: Observable<any[]>;
  employees = this.data.employees;
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
  customDate: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateTimelineComponent>,
              private coreService: CoreService,
              private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, ) {
    super()
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();
    const tomorrow = moment().add(1, 'days');

    this.customDate = new FormGroup({
      start: new FormControl(null, Validators.compose([Validators.required])),
      end: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void {
    this.types.push({
      name: this.data?.event.title,
      id: Math.random()
    })
    this.form = this.fb.group({
      employee: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      dateFrom: [this.data?.event.start, Validators.compose([Validators.required])],
      dateTo: [this.data?.event.end, Validators.compose([Validators.required])],
    });
    this.handlerAutocomplete('type');
    this.handlerAutocomplete('employee');
    console.log('eee', this.data);

    this.form.controls['type'].setValue(this.types.find(x => x.name === this.data?.event.title))
    this.form.controls['employee'].setValue(this.data.employees.find(x => x.id === this.data?.event._def.resourceIds[0]))
  }

  handlerAutocomplete(type) {
    if (type === 'type') {
      this.typesFilteredOptions = this.form.controls['type']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.types) : this.types.slice())),
      );
    } else if (type === 'employee') {
      this.employeesFilteredOptions = this.form.controls['employee']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.employees) : this.employees.slice())),
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(value) {
    console.log('save', value)
    this.dialogRef.close({data: value, edit: this.data.event});
  }

}
