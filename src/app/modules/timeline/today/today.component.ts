import {Component, OnInit} from '@angular/core';
import {DateAdapter} from "@angular/material/core";
import {GetLanguage} from "../../../shared/functions/shared-functions";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  employees = [];

  constructor(private dateAdapter: DateAdapter<any>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.employees = this.activatedRoute.snapshot.data['individuals']?.data;
    this.employees.forEach(emp => {
      emp.title = emp.name;
    })
    this.dateAdapter.setLocale(GetLanguage() === 'ar' ? 'ar-SA' : 'en-GB');
  }
}
