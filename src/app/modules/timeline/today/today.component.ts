import {Component, OnInit} from '@angular/core';
import {DateAdapter} from "@angular/material/core";
import {GetLanguage} from "../../../shared/functions/shared-functions";

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  constructor(private dateAdapter: DateAdapter<any>,) {
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale(GetLanguage() === 'ar' ? 'ar-SA' : 'en-GB');
  }
}
