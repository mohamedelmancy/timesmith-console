import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'timeline',
    name: 'Today',
    type: 'button',
    label: '',
    icon: '',
    role: '',
  },
  {
    state: 'reports',
    name: 'Reports',
    type: 'button',
    label: '',
    icon: '',
    role: '',
  },
  {
    state: 'notifications',
    name: 'Notifications',
    type: 'button',
    label: '',
    icon: '',
    role: '',
  },
  {
    state: 'requests',
    name: 'Requests',
    type: 'sub',
    label: '',
    icon: '',
    role: '',
    children: [
      {state: 'allocations', name: 'Allocations', label: '', role: ''},
      {state: 'time-off', name: 'Time Off', label: '', role: ''},
    ]
  },
  {
    state: 'configurations',
    name: 'Configurations',
    type: 'sub',
    label: '',
    icon: '',
    role: '',
    children: [
      {state: 'settings', name: 'Settings', label: '', role: ''},
      {state: 'sites', name: 'Sites', label: '', role: ''},
      {state: 'shifts', name: 'Shifts', label: '', role: ''},
      {state: 'leaves', name: 'Leaves', label: '', role: ''},
      {state: 'exceptions-codes', name: 'Exceptions Codes', label: '', role: ''},
    ]
  },
  {
    state: 'team',
    name: 'Team',
    type: 'button',
    label: '',
    icon: '',
    role: '',
  },
  {
    state: 'roles-permissions',
    name: 'Roles & Permissions',
    type: 'sub',
    label: '',
    icon: '',
    role: '',
    children: [
      {state: 'view-roles', name: 'View Roles', label: '', role: ''},
      {state: 'manage-permissions', name: 'Manage Permissions', label: '', role: ''},
    ]
  },
  {
    state: 'support',
    name: 'support',
    type: 'button',
    label: '',
    icon: '',
    role: '',
  },
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
