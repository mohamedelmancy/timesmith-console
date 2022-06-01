import {FormGroup} from '@angular/forms';
import 'moment/locale/ar-sa';
import 'moment/locale/en-au';

import {secureStorage} from "./secure-storage";

export function GetLanguage() {
    return (secureStorage.getItem('lang') || 'ar');
}

export function GetCurrentUser() {
    return secureStorage.getItem('userProfile');
}

export function HandleResponseError(error) {
    if (error?.error?.messageArEng) {
        if (GetLanguage() === 'ar') {
            return error.error.messageArEng[1]
        } else {
            return error.error.messageArEng[0]
        }
    } else if (error?.messageArEng) {
        if (GetLanguage() === 'ar') {
            return error.messageArEng[1]
        } else {
            return error.messageArEng[0]
        }
    } else {
        if (GetLanguage() === 'ar') {
            return error?.error?.messageAr
        } else {
            return error?.error?.messageEng
        }
    }
}

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({confirmedValidator: true});
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function ReloadCurrentComponent(router) {
    // https://www.codegrepper.com/code-examples/typescript/How+to+Reload+a+Component+in+Angular
    const currentUrl = router.url;
    router.routeReuseStrategy.shouldReuseRoute = () => false;
    router.onSameUrlNavigation = 'reload';
    router.navigate([currentUrl]);
}

export function searchInAllTableColumns(filterTypes, backup): any {
  return backup.filter(item => {
    for (let i = 0; i < filterTypes.length; i++) {
      var check = false;
      if (item[filterTypes[i]?.type] && (item[filterTypes[i]?.type]?.toString().trim().toLowerCase()
        .indexOf(filterTypes[i]?.value?.trim().toLowerCase()) !== -1)) {
        check =  true;
      } else {
        return  false;
      }
      if (i === filterTypes.length - 1) {
        return check
      }
    }
  })
}
