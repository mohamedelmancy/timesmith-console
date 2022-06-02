import { Component, OnInit } from '@angular/core';
import {AutoComplete} from "../../../shared/auto-complete";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import moment from "moment";

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
