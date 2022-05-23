import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {secureStorage} from "../../shared/functions/secure-storage";

@Injectable()
export class PageTitleService {
    public title: BehaviorSubject<string> = new BehaviorSubject<string>('');

    setTitle(value: string) {
        this.title.next(value);
    }

    getTitle() {
       return secureStorage.getItem('title');
    }
}
