import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmedValidator} from "../../functions/shared-functions";
import {ActivatedRoute} from "@angular/router";
import {CoreService} from "../../../services/core.service";
import {isMobile} from "../../variables/variables";

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  @Input() sideFilters;
  @Input() fromContainer = false;
  @Output() emittedData = new EventEmitter<any>();
  @Output() closeDrawer = new EventEmitter<any>();
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
  allFilters;
  selectedSites = [];
  selectedDepartments = [];
  selectedIndividuals = [];
  selectedRoles = [];
  paw;
  isMobile = isMobile;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) {
  }

  ngOnInit(): void {
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
    } else if (type === 'paw') {
      this.paw = selected.value
    }
    this.allFilters = {
      sites: this.selectedSites,
      departments: this.selectedDepartments,
      individuals: this.selectedIndividuals,
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
