import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";
import {GetLanguage} from "../../../../shared/functions/shared-functions";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {GlobalService} from "../../../../services/global.service";
import {debounceTime} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
@UntilDestroy()
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
              private domSanitizer: DomSanitizer,
              private globalService: GlobalService,
              private activatedRoute: ActivatedRoute, private coreService: CoreService) {
  }

  data;
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
  icons;
  iconsBackup;
  counter = 0;
  RELOAD_TOP_SCROLL_POSITION = 50;
  @ViewChild('customIcons') customIcons: any;
  searchCtrl = new FormControl();

  ngOnInit(): void {
    this.form = this.fb.group({
        nameEn: ['', Validators.compose([Validators.required])],
        nameAr: ['', Validators.compose([Validators.required])],
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
    this.search();
    // console.log('matIconRegistry', this.icons);
  }

  loadIcons() {
    if (!this.iconsBackup) {
      this.globalService.getMatIcons().subscribe(res => {
          console.log('res', res)
          this.icons = res?.names.slice(0, 100);
          this.counter++;
          this.iconsBackup = res?.names
        }, error => {

        }, () => {
          this.registerPanelScrollEvent();
        }
      )
    }
  }


  registerPanelScrollEvent() {
    const panel = this.customIcons.nativeElement;
    panel.addEventListener('scroll', event => this.loadAllOnScroll(event));
  }

  loadAllOnScroll(event) {
    console.log('event', event)
    if (event.target.scrollTop > this.RELOAD_TOP_SCROLL_POSITION * this.counter) {
      this.counter++;
      this.icons = this.iconsBackup.slice(0, this.counter * 100);
    }
  }

  fillForm() {
    this.form.controls['nameAr'].setValue(this.data?.nameAr);
    this.form.controls['nameEn'].setValue(this.data?.nameEn);
    this.form.controls['symbol'].setValue(this.data?.symbol);
  }

  chooseSymbol(e, type?) {
    console.log('ee', e);
    this.chosedSymbol = e;
    if (type === 'default') {
      this.form.controls['nameAr'].setValue(e.represent_ar);
      this.form.controls['nameEn'].setValue(e.represent_en);
    } else {
      this.form.controls['nameAr'].reset();
      this.form.controls['nameEn'].reset();
    }
  }

  search() {
    this.searchCtrl.valueChanges.pipe(
      debounceTime(1000),
      untilDestroyed(this)
    ).subscribe(search =>  {
      console.log('search', search)
      this.icons = this.iconsBackup.filter(name => name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1);
    });


  }

  save(value) {

  }

}
