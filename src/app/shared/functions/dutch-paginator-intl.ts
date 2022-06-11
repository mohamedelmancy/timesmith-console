import { MatPaginatorIntl } from '@angular/material/paginator';
import {GetLanguage} from './shared-functions';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
    const of = GetLanguage() === 'ar' ? 'من' : 'of';
    if (length == 0 || pageSize == 0) { return `0 ${of} ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${of} ${length}`;
}

// https://stackoverflow.com/a/47594193/13521237
export function getDutchPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = GetLanguage() === 'ar' ? 'عناصر بالصفحه' : 'Items per page';
    paginatorIntl.nextPageLabel = 'Next Page';
    paginatorIntl.previousPageLabel = 'Last page';
    paginatorIntl.getRangeLabel = dutchRangeLabel;

    return paginatorIntl;
}
