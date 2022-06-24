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
    type: 'button',
    label: '',
    icon: '',
    role: '',
    // children: [
    //   {state: 'allocations', name: 'Allocations', label: '', role: '', type: 'subChild'},
    //   {state: 'time-off', name: 'Time Off', label: '', role: '', type: 'subChild'},
    // ]
  },
  {
    state: 'configurations',
    name: 'Configurations',
    type: 'sub',
    label: '',
    icon: '',
    role: '',
    children: [
      {state: 'sites', name: 'Sites', label: '', role: '', type: 'subChild'},
      {state: 'departments', name: 'Departments', label: '', role: '', type: 'subChild'},
      {state: 'shifts', name: 'Shifts', label: '', role: '', type: 'subChild'},
      {state: 'leaves', name: 'Leaves', label: '', role: '', type: 'subChild'},
      {state: 'exception-codes', name: 'Exceptions Codes', label: '', role: '', type: 'subChild'},
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
    type: 'button',
    label: '',
    icon: '',
    role: '',
    // children: [
      // {state: 'view-roles', name: 'View Roles', label: '', role: '', type: 'subChild'},
      // {state: 'manage-permissions', name: 'Manage Permissions', label: '', role: '', type: 'subChild'},
    // ]
  },
  {
    state: 'support',
    name: 'Support',
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
