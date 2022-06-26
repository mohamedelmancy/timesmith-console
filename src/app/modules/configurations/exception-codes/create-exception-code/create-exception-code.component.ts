import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";
import {GetLanguage} from "../../../../shared/functions/shared-functions";
import {MatIconRegistry} from "@angular/material/icon";
import {names} from '../../../../../assets/js/icon-names'
@Component({
  selector: 'app-create-exception-code',
  templateUrl: './create-exception-code.component.html',
  styleUrls: ['./create-exception-code.component.scss']
})
export class CreateExceptionCodeComponent implements OnInit {
  form: FormGroup;
  chosedSymbol;

  constructor(private fb: FormBuilder,
              private matIconRegistry: MatIconRegistry,
              private activatedRoute: ActivatedRoute, private coreService: CoreService) {
  }
  data;
  fallbackIcon = 'fas fa-user';
  symbols = [
    {
      symbol_name: 'currency-usd',
      type: 'icon',
      represent_en: 'Overtime',
      represent_ar: 'أوفرتايم',
      name: ''
    },
    {
      symbol_name: 'bus-alert',
      type: 'icon',
      represent_en: 'Late',
      represent_ar: 'تأخير',
      name: ''
    },
    {
      symbol_name: 'bike-fast',
      type: 'icon',
      represent_en: 'External Assignment',
      represent_ar: 'مأمورية',
      name: ''
    },
    {
      symbol_name: 'baby-bottle-outline',
      type: 'icon',
      represent_en: 'Baby Hour',
      represent_ar: 'ساعة رضاعة',
      name: ''
    },
    {
      symbol_name: 'account-check',
      type: 'icon',
      represent_en: 'Permission',
      represent_ar: 'إذن',
      name: ''
    },
    {
      symbol_name: 'handshake-outline',
      type: 'icon',
      represent_en: 'Meeting',
      represent_ar: 'اجتماع',
      name: ''
    },
    {
      symbol_name: 'medical-bag',
      type: 'icon',
      represent_en: 'Covid19',
      represent_ar: 'كورونا',
      name: ''
    },
  ];
  language = GetLanguage();
  showSymbols = false;
  icons = names;
  iconsBackup = names;
  ngOnInit(): void {
    this.iconsBackup = names;
    this.form = this.fb.group({
        code: ['', Validators.compose([Validators.required])],
        symbol: [null, Validators.compose([Validators.required])],
      },
      {validators: []}
    );
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.data = this.activatedRoute.snapshot.data['leave'];
    this.data = secureStorage.getItem('row');
    this.fillForm();
    this.symbols.forEach(symbol => {
      symbol['name'] = this.language === 'ar' ? symbol.represent_ar : symbol.represent_en
    })
    console.log('this.data', this.data);
    // console.log('matIconRegistry', this.icons);
  }

  onIconPickerSelect(icon: string): void {
    // this.iconCss.setValue(icon);
    console.log('icon', icon)
    this.form.controls['symbol'].setValue(icon);
  }

  fillForm() {
    this.form.controls['code'].setValue(this.data?.name);
    this.form.controls['symbol'].setValue(this.data?.symbol);
  }

  chooseSymbol(e) {
    console.log('ee', e);
    this.chosedSymbol = e;
    this.form.controls['code'].setValue(e.name)
  }

  search(s) {
    console.log('sss', s.target.value);
    const filterValue = s.target.value;
    this.icons = this.iconsBackup.filter(name => name.toLowerCase().indexOf(filterValue.trim().toLowerCase()) !== -1);
  }

  save(value) {

  }

}
