import { Component, OnInit } from '@angular/core';
import {AutoComplete} from "../../../shared/auto-complete";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent extends AutoComplete implements OnInit {
  departmentsFilteredOptions: Observable<any[]>;
  sitesFilteredOptions: Observable<any[]>;
  sortsFilteredOptions: Observable<any[]>;
  departments = [
    {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    },

  ];
  sites = [
    {
      name: 'Site1',
      id: 1
    },
    {
      name: 'Site2',
      id: 2
    },

  ];
  sorts = [
    {
      name: 'Alphabetical',
      id: 1
    },
    {
      name: 'Punch in earliest first',
      id: 2
    },
    {
      name: 'Punch in latest first',
      id: 3
    },
    {
      name: 'Duration shortest first',
      id: 4
    },
    {
      name: 'Duration longest first',
      id: 5
    },

  ];
  form: FormGroup;
  constructor() {
    super()
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      department: new FormControl(null, []),
      site: new FormControl(null, []),
      sort: new FormControl(null, []),
    });

    this.handlerAutocomplete('department');
    this.handlerAutocomplete('site');
    this.handlerAutocomplete('sort');
  }

  handlerAutocomplete(type) {
    if (type === 'department') {
      this.departmentsFilteredOptions = this.form.controls['department']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.departments) : this.departments.slice())),
      );
    } else if (type === 'site') {
      this.sitesFilteredOptions = this.form.controls['site']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.sites) : this.sites.slice())),
      );
    } else if (type === 'sort') {
      this.sortsFilteredOptions = this.form.controls['sort']?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.name)),
        map(name => (name ? this._filter(name, this.sorts) : this.sorts.slice())),
      );
    }
  }
}
