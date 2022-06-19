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
      },{
        name: 'Sama taher',
        id: 4
      },
    ];
  allFilters;
  selectedSites = [];
  selectedDepartments = [];
  selectedIndividuals = [];
  pwa;
  isMobile = isMobile;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) { }

  ngOnInit(): void {
  }


  filterChanged(type, selected) {
    if (type === 'sites') {
      this.selectedSites = [];
      for(let a of selected) {
        this.selectedSites.push(a.value);
      }
    } else  if (type === 'departments') {
      this.selectedDepartments = [];
      for(let a of selected) {
        this.selectedDepartments.push(a.value);
      }
    } else  if (type === 'individuals') {
      this.selectedIndividuals = [];
      for(let a of selected) {
        this.selectedIndividuals.push(a.value);
      }
    }
    this.allFilters = {
      sites: this.selectedSites,
      departments: this.selectedDepartments,
      individuals: this.selectedIndividuals,
      pwa: this.pwa,
    };
    console.log('allFilters', this.allFilters)
    this.emittedData.emit(this.allFilters);
  }

  apply() {
    this.emittedData.emit(this.allFilters);
    this.closeDrawer.emit(false);
  }
}
