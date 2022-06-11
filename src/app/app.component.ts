import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {secureStorage} from "./shared/functions/secure-storage";
import {GetLanguage} from "./shared/functions/shared-functions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'timeSmithConsole';
  constructor(private translate: TranslateService, private router: Router, private dateAdapter: DateAdapter<any>, ) {
    // const browserLang: string = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.setLocalization();
  }

  setLocalization() {
    this.translate.addLangs(['en','ar']);
    this.translate.setDefaultLang('en');
    const lang = secureStorage.getItem('lang') || 'en';
    secureStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.dateAdapter.setLocale(GetLanguage() === 'ar' ? 'ar-SA' : 'en-GB');
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.direction = dir;
  }
}
