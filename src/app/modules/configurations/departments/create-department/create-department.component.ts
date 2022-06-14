import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {
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
  ngOnInit(): void {
    this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        employees: ['', Validators.compose([Validators.required])],
        manager: [null, Validators.compose([])],
      },
      {validators: []}
    );
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.setNewAutoSetting();
    this.data = this.activatedRoute.snapshot.data['department'];
    this.data = secureStorage.getItem('row');
    this.fillForm();
    console.log('this.data', this.data);
  }

  fillForm() {
    this.form.controls['name'].setValue(this.data?.name);
    this.form.controls['employees'].setValue(this.data?.employees);
    this.form.controls['manager'].setValue(this.data?.manager);
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
