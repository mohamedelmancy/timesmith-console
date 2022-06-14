import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";

@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.scss']
})
export class CreateShiftComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) { }
  data;
  dropdownSettings = {};
  placeholderText: string;
  selectAllText: string = 'Select all';
  unSelectAllText: string = 'Unselect all';
  searchText: string = 'type name...';
  disabled = false;
  noDataAvailText: string = 'No data available';
  employees = [
    {
      name: 'ahmed',
      id: 1
    },
    {
      name: 'Ali',
      id: 2
    },
    {
      name: 'Ola',
      id: 3
    },{
      name: 'Sama',
      id: 4
    },
  ]

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
    },{
      name: 'Tuesday',
      id: 4
    },{
      name: 'Wednesday',
      id: 5
    },{
      name: 'Thursday',
      id: 6
    },{
      name: 'Friday',
      id: 7
    },
  ]
  ngOnInit(): void {
    this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        employees: ['', Validators.compose([Validators.required])],
        weekends: ['', Validators.compose([Validators.required])],
        from: [null, Validators.compose([Validators.required])],
        to: [null, Validators.compose([Validators.required])],
      },
      {validators: []}
    );
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.setNewAutoSetting();
    this.data = this.activatedRoute.snapshot.data['shift'];
    this.data = secureStorage.getItem('row');
    this.fillForm();
    console.log('this.data', this.data);
  }

  fillForm() {
    this.form.controls['name'].setValue(this.data?.name);
    this.form.controls['employees'].setValue(this.data?.employees);
    this.form.controls['weekends'].setValue(this.data?.weekends);
    this.form.controls['from'].setValue(this.data?.from);
    this.form.controls['to'].setValue(this.data?.to);
  }
  setNewAutoSetting() {
    this.dropdownSettings = {
      'singleSelection': false,
      'defaultOpen': false,
      'idField': 'id',
      'textField': 'name',
      'selectAllText': this.selectAllText,
      'unSelectAllText': this.unSelectAllText,
      'searchPlaceholderText': this.searchText,
      'noDataAvailablePlaceholderText': this.noDataAvailText,
      'enableCheckAll': true,
      'itemsShowLimit': 'All',
      'allowSearchFilter': true
    };
  }

  save(value) {

  }

}
