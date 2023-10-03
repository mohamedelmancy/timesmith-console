import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {secureStorage} from "../../functions/secure-storage";
import {SearchCountryField, CountryISO, PhoneNumberFormat} from 'ngx-intl-tel-input';
import {UntypedFormControl} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-phone-with-country',
  templateUrl: './phone-with-country.component.html',
  styleUrls: ['./phone-with-country.component.scss']
})
export class PhoneWithCountryComponent implements OnInit, OnChanges, AfterViewInit {
  @Output() phoneValue: any = new EventEmitter();
  @Input() full_mobile_number: any;
  @Input() value: any;
  @Input() countryCode: any;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  selectedCountryISO = CountryISO["Egypt"];
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Egypt, CountryISO.SaudiArabia];
  currentCountry = secureStorage.getItem('location')?.country;
  error_msg;
  phone;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      document.getElementById('phone').innerHTML = this.value;
    }, 3000)
    this.phone = this.full_mobile_number;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
  }

  onInputChange(e) {
    console.log('eeeee', e)
    if (!e.isNumberValid) {
      this.error_msg = true;
    } else {
      this.phoneValue.emit(e);
      this.error_msg = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changesss', changes);
    this.phone = `+${this.countryCode}${this.value}`;
    if (changes['full_mobile_number']) {
      this.phone = '+201069024896';
    }
  }
}
