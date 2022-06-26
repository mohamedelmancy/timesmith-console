import { Component, OnInit } from '@angular/core';
import moment from "moment";
import {dateFormat, dateTimeFormat} from "../../../shared/variables/variables";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-exception-codes',
  templateUrl: './exception-codes.component.html',
  styleUrls: ['./exception-codes.component.scss']
})
export class ExceptionCodesComponent implements OnInit {

  displayedColumns = {
    labels: ['Exception code', 'Symbol', 'Actions'],
    values: ['code', 'symbol', 'actions'],
  };
  constructor(private activatedRoute: ActivatedRoute) { }
  data = [
    {
      code: 'External Assignment',
      symbol: {
        symbol_name: 'bike-fast',
        type: 'icon',
        represent_en: 'External Assignment',
        represent_ar: 'مأمورية',
        name: ''
      },
      id: 1
    },{
      code: 'Baby Hour',
      symbol: {
        symbol_name: 'baby-bottle-outline',
        type: 'icon',
        represent_en: 'Baby Hour',
        represent_ar: 'ساعة رضاعة',
        name: ''
      },
      id: 2
    },
    {
      code: 'Meeting',
      symbol: {
        symbol_name: 'handshake-outline',
        type: 'icon',
        represent_en: 'Meeting',
        represent_ar: 'اجتماع',
        name: ''
      },
      id: 3
    },
  ]
  ngOnInit(): void {
    // this.data = this.activatedRoute.snapshot.data['exceptionCode'];
    this.data.forEach(item => {
    })
  }

  deleteRow(event) {
    console.log('e', event)
    const i = this.data.findIndex(x => x?.id === event.id);
    console.log('i', i)
    this.data = this.data.filter(x =>  x.id !== event?.id);
  }

}
