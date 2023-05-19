import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CoreService} from "../../../services/core.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {map} from "rxjs/operators";
import {ObservablesService} from "../../../services/observables.service";

@UntilDestroy()
@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  @Input() filtersNames: any;
  @Input() fromContainer = false;
  @Input() pawStatistics: { yes, no };
  @Output() emittedData = new EventEmitter<any>();
  @Output() closeDrawer = new EventEmitter<any>();
  sideFilters = [];
  departments = [
    {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }, {
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
      name: 'Site111111111111111111111111111',
      id: 1
    },
    {
      name: 'Site2',
      id: 2
    },
    {
      name: 'Abbas Al Akkad',
      id: 3
    },

  ];
  individuals = [
    {
      name: 'ahmed taha',
      id: 1
    },
    {
      name: 'Ali alaaa',
      id: 2
    },
    {
      name: 'Ola osama',
      id: 3
    }, {
      name: 'Sama taher',
      id: 4
    },
  ];
  roles = [
    {
      name: 'SuperAdmin',
      id: 1
    },
    {
      name: 'Admin',
      id: 3
    },
    {
      name: 'Manager',
      id: 2
    },
    {
      name: 'User',
      id: 4
    },

  ];
  report_types = [
    {
      name: 'Time',
      id: 1
    },
    {
      name: 'leave',
      id: 3
    },
    {
      name: 'Exception code',
      id: 2
    }
  ];
  request_status = [
    {
      name: 'All',
      id: 1
    },
    {
      name: 'Pending',
      id: 3
    },
    {
      name: 'Approved',
      id: 2
    }
  ];
  allFilters;
  selectedSites = [];
  selectedDepartments = [];
  selectedIndividuals = [];
  selectedRoles = [];
  selectedReportTypes = [];
  selectedRequestsStatus = [];
  paw;
  isMobile$ = this.observablesService.isMobile$.pipe(untilDestroyed(this), map(res => res));

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private coreService: CoreService,
              private observablesService?: ObservablesService
  ) {
  }

  ngOnInit(): void {
    console.log('ff', this.filtersNames)
    this.prepareFilters();
  }

  prepareFilters() {
    this.filtersNames?.map((type: any) => {
      console.log('type', type)
      const obj = {
        name: type.replaceAll('_', ' '),
        filters: this[`${type}`]
      }
      this.sideFilters.push(obj);
    });
    console.log('ff', this.sideFilters)
  }


  filterChanged(type, selected) {
    console.log('selected', selected)
    if (type === 'sites') {
      this.selectedSites = [];
      for (let a of selected) {
        this.selectedSites.push(a.value);
      }
    } else if (type === 'departments') {
      this.selectedDepartments = [];
      for (let a of selected) {
        this.selectedDepartments.push(a.value);
      }
    } else if (type === 'individuals') {
      this.selectedIndividuals = [];
      for (let a of selected) {
        this.selectedIndividuals.push(a.value);
      }
    } else if (type === 'roles') {
      this.selectedRoles = [];
      for (let a of selected) {
        this.selectedRoles.push(a.value);
      }
    } else if (type === 'report_types') {
      this.selectedReportTypes = [];
      for (let a of selected) {
        this.selectedReportTypes.push(a.value);
      }
    } else if (type === 'requests_status') {
      this.selectedRequestsStatus = [];
      for (let a of selected) {
        this.selectedRequestsStatus.push(a.value);
      }
    } else if (type === 'paw') {
      this.paw = selected.value
    }
    this.allFilters = {
      sites: this.selectedSites,
      departments: this.selectedDepartments,
      individuals: this.selectedIndividuals,
      reportTypes: this.selectedReportTypes,
      requestsStatus: this.selectedRequestsStatus,
      roles: this.selectedRoles,
      paw: this.paw,
    };
    console.log('allFilters', this.allFilters)
    // if (!this.fromContainer) {
    this.emittedData.emit(this.allFilters);
    // }
  }

  apply() {
    this.closeDrawer.emit(this.allFilters);
  }
}
