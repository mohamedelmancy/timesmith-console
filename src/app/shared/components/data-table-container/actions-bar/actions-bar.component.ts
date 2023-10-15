import {Component, Input} from '@angular/core';
import {ExcelService} from "../../../../services/excel.service";

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.scss']
})
export class ActionsBarComponent {
  @Input() sort_options;
  @Input() has_excel_export;
  @Input() columns;
  @Input() dataSource: any;
  @Input() selection: any;

  constructor(private excelService: ExcelService,) {
  }

  sortItems(option) {
    console.log('sort', option)
  }

  exportExcel() {
    console.log('excel', this.columns);
    const data = this.selection?.selected?.length ? this.selection?.selected : this.dataSource?.data;
    const headers = this.columns.labels;
    const values = this.columns.values;
    this.excelService.generateExcel(data, values, headers, null);
  }
}
