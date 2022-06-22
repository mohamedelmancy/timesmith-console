import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {CoreService} from "../../../services/core.service";
import {AutoComplete} from "../../../shared/auto-complete";
import {secureStorage} from "../../../shared/functions/secure-storage";

@Component({
  selector: 'app-create-roles-and-permissions',
  templateUrl: './create-roles-and-permissions.component.html',
  styleUrls: ['./create-roles-and-permissions.component.scss']
})
export class CreateRolesAndPermissionsComponent extends AutoComplete implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) {
    super()
  }

  data;
  permissions = [
    {
      name: 'TimeLine',
      permissions: [
        'view',
        'remove',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
        'edit',
      ]
    },
    {
      name: 'Shifts',
      permissions: [
        'view',
        'remove',
      ]
    },
    {
      name: 'Site',
      permissions: [
        'view',
        'edit'
      ]
    }
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        // employees: ['', Validators.compose([Validators.required])],
        permissions: [null, Validators.compose([])],
      },
      {validators: []}
    );
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.data = this.activatedRoute.snapshot.data['roleAndPermission'];
    this.data = secureStorage.getItem('row');
    if (this.data) {
      this.fillForm();
    }
    console.log('this.data', this.data);
  }

  fillForm() {
    this.form.controls['name'].setValue(this.data?.name);
    // this.form.controls['employees'].setValue(this.data?.employees);
  }


  filterChanged(roleIndex, selected) {
    console.log('roleIndex', roleIndex)
    console.log('selected', selected)
      for (let a of selected) {
    }
  }

  save(value) {

  }

}
