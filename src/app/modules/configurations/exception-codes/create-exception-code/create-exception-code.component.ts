import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {GetLanguage, HandleResponseError} from "../../../../shared/functions/shared-functions";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {GlobalService} from "../../../../services/global.service";
import {debounceTime} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

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
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private coreService: CoreService,
              private translateService: TranslateService) {
  }

  exception_code;
  exception_code_id;
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
    this.exception_code = this.activatedRoute.snapshot.data['exceptionCode']?.data;
    this.form = this.fb.group({
        name_en: ['', Validators.compose([Validators.required])],
        name_ar: ['', Validators.compose([Validators.required])],
        symbol: [null, Validators.compose([Validators.required])],
      },
      {validators: []}
    );
    this.exception_code_id = this.activatedRoute.snapshot.data['exceptionCode']?.data?.id;
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    if (this.exception_code_id) {
      this.fillForm();
    }
    this.symbols.forEach(symbol => {
      symbol['name'] = this.language === 'ar' ? symbol.represent_ar : symbol.represent_en
    })
    console.log('this.data', this.exception_code);
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
    this.form.controls['name_ar'].setValue(this.exception_code?.name_ar);
    this.form.controls['name_en'].setValue(this.exception_code?.name_en);
    this.form.controls['symbol'].setValue(this.symbols.find(x => x.symbol_name === this.exception_code?.icon));
    this.chooseSymbol(this.symbols.find(x => x.symbol_name === this.exception_code?.icon), 'default');
  }

  chooseSymbol(e, type?) {
    console.log('ee', e);
    this.chosedSymbol = e;
    if (type === 'default') {
      this.form.controls['name_ar'].setValue(e.represent_ar);
      this.form.controls['name_en'].setValue(e.represent_en);
    } else {
      this.form.controls['name_ar'].reset();
      this.form.controls['name_en'].reset();
    }
  }

  search() {
    this.searchCtrl.valueChanges.pipe(
      debounceTime(100),
      untilDestroyed(this)
    ).subscribe(search => {
      console.log('search', search)
      if (search?.length) {
        this.icons = this.iconsBackup.filter(name => name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1);
      } else {
        this.icons = this.iconsBackup;
      }
    });


  }

  save(value) {
    if (!this.form.valid) {
      this.form?.markAllAsTouched();
    } else {
      var data = new FormData();
      data.append("name_en", this.form.value.name_en);
      data.append("name_ar", this.form.value.name_ar);
      data.append("icon", this.form.value.symbol?.symbol_name);

      console.log('body', data)
      if (!this.exception_code_id) {
        this.coreService.postRequest('console/exceptions_codes', data).pipe(untilDestroyed(this)).subscribe(res => {
          this.form.reset();
          this.form.markAsUntouched();
          this.form.markAsPristine();
          this.form.setErrors(null);
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/configurations/exception-codes']);
        })
      } else {
        this.coreService.postRequest(`console/exceptions_codes/${this.exception_code_id}`, data).pipe(untilDestroyed(this)).subscribe(res => {
          this.toastr.success(res?.message)
        }, error => {
          this.toastr.error(HandleResponseError(error));
        }, () => {
          this.router.navigate(['/configurations/exception-codes']);
        })
      }
    }
  }


}
