import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {AutoComplete} from "../../../../shared/auto-complete";

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent extends AutoComplete implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) {
    super()
  }
  data;
  dropdownSettings = {};
  placeholderText: string;
  selectAllText: string = 'Select all';
  unSelectAllText: string = 'Unselect all';
  searchText: string = 'type name...';
  disabled = false;
  noDataAvailText: string = 'No data available';
  managers  = [
    {
      name: 'Samy',
      id: 1,
    },
    {
      name: 'Ahmed',
      id: 2,
    }
  ];
  managersFilteredOptions: Observable<any[]>;
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
  ngOnInit(): void {
    this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        // employees: ['', Validators.compose([Validators.required])],
        manager: [null, Validators.compose([])],
      },
      {validators: [this.checkAutoComplete()]}
    );
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.setNewAutoSetting();
    this.handlerAutocomplete('manager')
    this.data = this.activatedRoute.snapshot.data['department'];
    this.data = secureStorage.getItem('row');
    this.fillForm();
    console.log('this.data', this.data);
  }

  fillForm() {
    this.form.controls['name'].setValue(this.data?.name);
    // this.form.controls['employees'].setValue(this.data?.employees);
    this.form.controls['manager'].setValue(this.managers.find(x => x.id === this.data.manager?.id));
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

  handlerAutocomplete(type) {
     if (type === 'manager') {
      this.managersFilteredOptions = this.form.controls['manager']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.managers) : this.managers.slice())),
      );
    }
  }

  checkAutoComplete() {
    return (formGroup: FormGroup) => {
      const manager = formGroup?.controls['manager'];
      //////////////////////////////////////////////////////////////
      const indexManager = this.managers.findIndex(res => res === manager.value);

      if (indexManager === -1  && manager.value) {
        manager.setErrors({wrong: true});
      } else {
        manager.setErrors(null);
      }
    }

  }

  save(value) {

  }

}
