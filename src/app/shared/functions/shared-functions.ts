import {FormGroup} from '@angular/forms';
import 'moment/locale/ar-sa';
import 'moment/locale/en-au';
import {secureStorage} from "./secure-storage";
import moment from "moment";

export function GetLanguage() {
  return (secureStorage.getItem('lang') || 'ar');
}

export function GetCurrentUser() {
  return secureStorage.getItem('userProfile');
}


export function HandleListName(list) {
  list?.forEach(item => item.name = GetLanguage() === 'ar' ? item.name_ar : item.name_en)
  return list;
}

export function HandleResponseError(error) {
  return (error?.error?.error ? error?.error?.error : error?.error?.message);
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

export function searchInAllTableColumns(filterColumns, backup): any {
  return backup.filter(item => {
    for (let i = 0; i < filterColumns.length; i++) {
      var check = false;
      if (item[filterColumns[i]?.type] && (item[filterColumns[i]?.type]?.toString().trim().toLowerCase()
        .indexOf(filterColumns[i]?.value?.trim().toLowerCase()) !== -1)) {
        check = true;
      } else {
        return false;
      }
      if (i === filterColumns.length - 1) {
        return check
      }
    }
  })
}

export function filterTable(e, backup) {
  console.log('e', e);
  let loopedArr;
  let data = backup;
  if (e?.sites?.length) {
    loopedArr = e.sites;
    data = loopOverFilter(loopedArr, 'site', data);
  }
  if (e?.departments?.length) {
    loopedArr = e.departments;
    data = loopOverFilter(loopedArr, 'department', data);
  }
  if (e?.individuals?.length) {
    loopedArr = e.individuals;
    data = loopOverFilter(loopedArr, 'employee', data);
  }
  if (e?.roles?.length) {
    loopedArr = e.roles;
    data = loopOverFilter(loopedArr, 'role', data);
  }
  if (e?.reportTypes?.length) {
    loopedArr = e.reportTypes;
    data = loopOverFilter(loopedArr, 'type', data);
  }
  if (e?.requestsStatus?.length) {
    loopedArr = e.requestsStatus;
    data = loopOverFilter(loopedArr, 'status', data);
  }
  if (e?.paw) {
    data = data.filter(x => x.PAW === e.paw);
    console.log('paw', data)
  }
  return data
}

function loopOverFilter(loopedArr, column, backup?) {
  let filtered = [];
  console.log('loopedArr', loopedArr)
  for (let i = 0; i < loopedArr.length; i++) {
    if (loopedArr[i]?.name?.trim().toLowerCase() === 'all') {
      return backup;
    }
    let batch = backup.filter(x => x[column]?.toString().trim().toLowerCase() === loopedArr[i]?.name?.trim().toLowerCase());
    batch?.forEach(one => {
      if (filtered.findIndex(x => x === one) === -1) {
        filtered.push(one);
      }
    })
    console.log('filtered', filtered)
  }
  return filtered;
}

export function setMomentLocal() {
  moment.locale(GetLanguage() === 'ar' ? 'ar-sa' : 'en-US');
}
