import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import {Router} from '@angular/router';
import {GetLanguage} from "../../../shared/functions/shared-functions";
import {secureStorage} from "../../../shared/functions/secure-storage";

@Component({
  selector: 'app-language-drop-down',
  templateUrl: './language-drop-down.component.html',
  styleUrls: ['./language-drop-down.component.scss']
})
export class LanguageDropDownComponent implements OnInit {

  selectImage = '';

  langArray: any [] = [
    {
      img: 'assets/img/en.png',
      name: 'English',
      value	: 'en'
    },
    {
      img: 'assets/img/ar3.png',
      name: 'Arabic',
      value: 'ar'
    },

  ];

  constructor(public translate: TranslateService, private router: Router) { }

  ngOnInit() {
    this.selectImage = this.langArray.find(lang => lang.value === GetLanguage()).img;
  }

  // setLang method is used to set the language into template.
  setLang(lang) {
    for (const data of this.langArray) {
      if (data.value == lang) {
        this.selectImage = data.img;
        break;
      }
    }
    const current = GetLanguage();
    if (current !== lang) {
      secureStorage.setItem('lang', lang);
      // ReloadCurrentComponent(this.router);
      window.location.reload();
      this.translate.use(lang);
    }
  }
}
