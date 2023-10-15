import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {secureStorage} from "../shared/functions/secure-storage";
import {environment} from "../../environments/environment";
import {momentDateFormat} from "../shared/variables/variables";
import {PageTitleService} from "../core/page-title/page-title.service";
import {GetLanguage, setMomentLocal} from "../shared/functions/shared-functions";
import * as Excel from 'exceljs/dist/exceljs.min.js'
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {


  constructor(private datePipe: DatePipe,
              private translateService: TranslateService,
              private pageTitleService: PageTitleService) {

  }

  generateExcel(data, values, header?, formData?, subHeaders?, subValues?, translateService?) {
    setMomentLocal();
    const translatedTitle = this.pageTitleService.getTitle();
    const title = secureStorage.getItem('title');
    const customHeaders = [...header];
    const customValues = [...values];
    var customSubHeaders = [];
    var customSubValues = [];
    var subHeader = [];
    var subData = [];
    const nestedTables = ['Evaluation details', 'Actions on files status', 'Actions on service request', 'NOC audit']
    if (nestedTables?.includes(title)) {
      customSubHeaders = [...subHeaders];
      customSubValues = [...subValues];
      // @ts-ignore
      subHeader = Object.values(translateService.instant(customSubHeaders));
    }
    const prepare = [];
    data.forEach(e => {
      const row = [];
      const innerRow = [];
      customValues.forEach((value, index) => {
        row.push(e[value]?.toString() || ' - ');
      });
      if (nestedTables?.includes(title)) {
        const firstNested = title === 'Evaluation details' ? e?.evaluationLsit :
          title === 'Actions on files status' ? e?.mainSubObject :
            title === 'NOC audit' ? e?.auditEntriesModelDetails
              : e?.mainSubObject
        firstNested.forEach(sub => {
          const subRow = [];
          customSubValues.forEach((value) => {
            // column.push((e[value]?.toString()?.replace(')', '(').replace('(', ')')) || ' - ');
            subRow.push(sub[value]?.toString() || ' - ');
          });
          innerRow.push(subRow);
        })
      }
      row.push(innerRow)
      prepare.push(row);
    });
    data = prepare;
    // console.log('prepare', prepare)
    this.translateService.get(customHeaders).subscribe(async res => {
      // @ts-ignore
      header = Object.values(res);
      // Create workbook and worksheet
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet(translatedTitle, {views: [{rightToLeft: GetLanguage() === 'ar'}]});

      // Add Image
      const imageUrl = GetLanguage() === 'ar' ? environment.mainLogo : environment.mainLogo
      const imageBytes = await fetch(imageUrl).then(response => response.arrayBuffer());
      let logo = workbook.addImage({
        // base64: logoFile.logoBase64,
        extension: 'png',
        buffer: imageBytes
      });
      worksheet.addImage(logo, 'B2:B5');
      worksheet.mergeCells('B1:B5');

      // Add Row and formatting
      worksheet.addRow([]);
      const date = GetLanguage() === 'ar' ? ': التاريخ' : 'Date : ';
      const subTitleRow = worksheet.addRow(GetLanguage() === 'ar' ? [momentDateFormat(new Date()) + date] : [date + momentDateFormat(new Date())])
      subTitleRow.font = {name: 'Comic Sans MS', family: 4, size: 17, underline: 'none', bold: false}


      // Blank Row
      worksheet.addRow([]);

      // Add Header Row
      const headerRow = worksheet.addRow(header);
      headerRow.font = {family: 4, size: 14, underline: 'none', bold: true}

      // Cell Style : Fill and Border
      headerRow.eachCell((cell, colNumber) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: '0c35f8'},
          bgColor: {argb: '0c35f8'}
        }
        cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}}
        cell.font = {color: {argb: 'FFFFFF'}, family: 4, size: 14, underline: 'none', bold: true}
      })
      // worksheet.addRows(data);


      // Add Data and Conditional Formatting
      data.forEach(d => {
          const nested = d[d.length - 1];
          d[d.length - 1] = null;
          const row = worksheet.addRow(d);
          row.font = {size: 16, family: 4, underline: 'none', bold: false};
          row.alignment = {horizontal: GetLanguage() === 'ar' ? 'right' : 'left'}
          if (nested) {
            // Add Sub Header Row
            const subHeaderRow = worksheet.addRow(subHeader);
            subHeaderRow.font = {family: 3, size: 11, underline: 'none', bold: true}
            // Cell Style : Fill and Border
            subHeaderRow.eachCell((cell, colNumber) => {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'f8820c'},
                bgColor: {argb: 'f8820c'}
              }
              cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}}
              cell.font = {color: {argb: 'FFFFFF'}, family: 4, size: 14, underline: 'none', bold: true}
            })
            nested?.forEach(sub => {
              const subRow = worksheet.addRow(sub);
              subRow.font = {size: 12, family: 4, underline: 'none', bold: false};
              row.alignment = {horizontal: GetLanguage() === 'ar' ? 'right' : 'left'}
            })
          }
        }
      );

      // worksheet.getColumn(3).width = 30;
      // worksheet.getColumn(4).width = 30;
      // worksheet.addRow([]);

      worksheet.columns.forEach(column => {
        // const lengths = column.values.map(v => v?.toString().length);
        // const maxLength = Math.max(...lengths?.filter(v => typeof v === 'number')) + 5;
        // column.width = maxLength < 10 ? 10 : maxLength;
        column.width = 30;
      });
      // Footer Row
      // // let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
      // // footerRow.getCell(1).fill = {
      // //     type: 'pattern',
      // //     pattern: 'solid',
      // //     fgColor: {argb: 'FFCCFFE5'}
      // // };
      // footerRow.getCell(1).border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}}
      //
      // //Merge Cells
      // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

      // Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        fs.saveAs(blob, `${translatedTitle}-${momentDateFormat(new Date())}.xlsx`);
      })
    });
  }
}
