import { Component, OnInit } from '@angular/core';
import moment from "moment";
import {dateTimeFormat} from "../../../shared/variables/variables";
import {ActivatedRoute} from "@angular/router";
import {DeleteComponent} from "../../../modals/delete/delete.component";
import {GetLanguage} from "../../../shared/functions/shared-functions";
import {MatDialog} from "@angular/material/dialog";
import {ViewPermissionsComponent} from "../../../modals/view-permissions/view-permissions.component";

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss']
})
export class RolesAndPermissionsComponent implements OnInit {
  displayedColumns = {
    labels: ['Role name', 'Individuals', 'Default permissions','Actions'],
    values: ['name', 'individuals', 'default permissions', 'actions'],
  };
  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }
  data = [
    {
      name: 'SuperAdmin',
      permissions: [
        {
          name: 'TimeLine',
          permissions: [
            'view',
            'remove',
            'edit'
          ]
        },
        {
          name: 'Shifts',
          permissions: [
            'view',
            'remove',
          ]
        }
      ],
      individuals: 3,
      id: 1
    }, {
      name: 'Admin',
      permissions: [
        {
          name: 'Shifts',
          permissions: [
            'view',
            'edit'
          ]
        }
      ],
      individuals: 5,
      id: 2
    }, {
      name: 'User',
      permissions: [
        {
          name: 'Site',
          permissions: [
            'remove',
            'edit'
          ]
        }
      ],
      individuals: 9,
      id: 3
    }, {
      name: 'Manager',
      permissions: [
        {
          name: 'Departments',
          permissions: [
            'view',
            'remove',
          ]
        }
      ],
      individuals: 5,
      id: 4
    },
  ]
  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['rolesAndPermissions'];
    this.data.forEach(item => {

    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }

  viewPermission(event) {
    console.log('viewPermission', event)
    const dialogRef = this.dialog.open(ViewPermissionsComponent, {
        data: event,
        direction: GetLanguage() === 'ar' ? 'rtl' : 'ltr',
        minHeight: '50%',
        width: window.innerWidth > 1199 ? '35%' : '90%'
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('res', result);
      if (result === 'yes') {
      }
    })
  }

}
