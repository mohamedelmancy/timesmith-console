import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export class AutoComplete  {
    myControl = new FormControl();
    constructor() {
    }

    displayFn(option: any): string {
        return option && option.name ? option.name : '';
    }

     _filter(name: string, options): any[] {
        const filterValue = typeof(name) === 'string' ? name.toLowerCase() : name;
        return options.filter(option => typeof(option.name) === 'string' ?
            option.name?.toLowerCase().includes(filterValue) :
            String(option.name).includes(filterValue)
        );
    }

}
