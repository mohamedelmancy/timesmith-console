import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.scss']
})
export class CreateShiftComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService, private translateService: TranslateService) { }
  data;
  selectedItems = [];
  dropdownSettings = {};
  placeholderText: string;
  selectAllText: string = this.translateService.instant('Select all');
  unSelectAllText: string = this.translateService.instant('Unselect all');
  searchText: string = this.translateService.instant('type name...');
  disabled = false;
  noDataAvailText: string = this.translateService.instant('No data available');
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

  weekends = [
    {
      itemName: 'Saturday',
      id: 1
    },
    {
      itemName: 'Sunday',
      id: 2
    },
    {
      itemName: 'Monday',
      id: 3
    },{
      itemName: 'Tuesday',
      id: 4
    },{
      itemName: 'Wednesday',
      id: 5
    },{
      itemName: 'Thursday',
      id: 6
    },{
      itemName: 'Friday',
      id: 7
    },
  ]
  ngOnInit(): void {
    this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        // employees: ['', Validators.compose([Validators.required])],
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
    // this.form.controls['employees'].setValue(this.data?.employees);
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

  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any){
    console.log(items);
  }
  onDeSelectAll(items: any){
    console.log(items);
  }

  save(value) {

  }

}
