import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor() { }
  supportPhone = environment.supportPhone;
  emailString = `mailto:${environment.supportEmail}`
  whatsUpString = `https://wa.me/${environment.supportPhone}`
  ngOnInit(): void {
  }

}
