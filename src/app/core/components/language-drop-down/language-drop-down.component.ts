import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
import {GetLanguage} from "../../../shared/functions/shared-functions";
import {secureStorage} from "../../../shared/functions/secure-storage";

@Component({
  selector: 'app-language-drop-down',
  templateUrl: './language-drop-down.component.html',
  styleUrls: ['./language-drop-down.component.scss']
})
export class LanguageDropDownComponent implements OnInit {
  selectedLanguage;
  languageList = [];

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
    this.languageList = [
      {code: 'en', label: 'English', img: '../../../../assets/img/en.png'},
      {code: 'ar', label: 'Arabic', img: '../../../../assets/img/ar.png'},
    ];
    this.selectedLanguage = this.languageList.find(x => x.code === GetLanguage()) || this.languageList[0];
  }

  changeSiteLanguage(localeCode: string): void {
    const current = GetLanguage();
    this.selectedLanguage = this.languageList.find(x => x.code === localeCode);
    if (current !== localeCode) {
      secureStorage.setItem('lang', localeCode);
      window.location.reload();
    }
  }
}
