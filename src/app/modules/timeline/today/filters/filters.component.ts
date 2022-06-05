import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import moment from "moment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {AutoComplete} from "../../../../shared/auto-complete";
import {GetLanguage} from "../../../../shared/functions/shared-functions";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent extends AutoComplete implements OnInit {
  @Output() chosenDate = new EventEmitter<any>();
  language = GetLanguage();
  form: FormGroup;
  customDate: FormGroup;
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
  constructor(private fb: FormBuilder) {
    super();
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();
    const tomorrow = moment().add(1, 'days');

    this.customDate = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      department: new FormControl(null, []),
      site: new FormControl(null, []),
      sort: new FormControl(null, []),
      date: new FormControl(null, []),
    },
      {validators: [this.checkAutoComplete()]}
    );

    this.handlerAutocomplete('department');
    this.handlerAutocomplete('site');
    this.handlerAutocomplete('sort');
  }

  changeDate(e) {
    console.log('e', e);
    this.chosenDate.emit(e);
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

  checkAutoComplete() {
    return (formGroup: FormGroup) => {
      const department = formGroup?.controls['department'];
      const sort = formGroup?.controls['sort'];
      const site = formGroup?.controls['site'];
      //////////////////////////////////////////////////////////////
      const indexDep = this.departments.findIndex(res => res === department.value);
      const indexSort = this.sorts.findIndex(res => res === sort.value);
      const indexSite = this.sites.findIndex(res => res === site.value);
      // const indexStatus = this.districtsOptions.findIndex(res => res === status.value);
      if (indexDep === -1) {
        department.setErrors({wrong: true});
      } else {
        department.setErrors(null);
      }
      if (indexSort === -1) {
        sort.setErrors({wrong: true});
      } else {
        sort.setErrors(null);
      }
      if (indexSite === -1) {
        site.setErrors({wrong: true});
      } else {
        site.setErrors(null);
      }
    }

  }
}
