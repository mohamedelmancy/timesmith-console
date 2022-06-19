import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {secureStorage} from "../functions/secure-storage";
export const today = new Date();
export const phone_pattern = '[- +()0-9]+';
export const currentLanguage = (secureStorage.getItem('lang') || 'ar');
export const dateFormat = currentLanguage === 'en' ? 'D/M/yyyy' : 'yyyy/M/D';
export const dateTimeFormat = currentLanguage === 'en' ? 'DD-MM-yyyy HH:MM A' : 'yyyy-MM-DD HH:MM A';
export const monthDateFormat = currentLanguage === 'en' ? 'M/yyyy' : 'yyyy/M';
export const datePipe = new DatePipe('en');
export const primaryColor = (window as any).primaryColor;
export const isMobile = window.innerWidth < 1300;
export const momentDateFormat = (date, normal?, format?) => {
    if (normal) {
        return moment(date).format(format || dateFormat);
    } else {
        return reverseString(moment(date).format(format || 'D/M/YYYY'));
    }
};
export const momentMonthDateFormat = date => {
    return reverseString(moment(date).format('M/YYYY'));
};
const reverseString = str => {
    if (currentLanguage === 'ar') {
        moment.locale('ar_SA');
        return str.split('/').reverse().map(one => [...one].join(''))
            .toString().replaceAll(',', '/');
    } else {
        moment.locale('en')
        return str;
    }
};
