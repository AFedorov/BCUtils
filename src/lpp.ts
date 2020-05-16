// import WorkBook, WorkSheet from 'xlsx'
import * as XLSX from 'xlsx'
// import {WorkSheet} from "xlsx";

const workbook = XLSX.readFile(process.argv[2])
const sheet = workbook.Sheets[workbook.SheetNames[0]]

let log: string = ''

let range = XLSX.utils.decode_range(<string>sheet['!ref'])
console.log('range.s.r = ' + range.s.r + '\nrange.e.r = ' + range.e.r + '\nrange.s.c = ' + range.s.c + '\nrange.e.c = ' + range.e.c)
for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
        let cellValue = sheet[XLSX.utils.encode_cell({c: colNum, r: rowNum})]
        if (typeof cellValue === 'undefined') log += ' undef'
        else log += ' ' + cellValue.v.toString().trim()
    }
    console.log(log)
    log = ''
}
// let range = XLSX.utils.decode_range(sheet['!ref']);
// sheet_name_list.forEach(function(y) { /* iterate through sheets */
//     var worksheet = workbook.Sheets[y];
//     for (let z in worksheet) {
//         /* all keys that do not begin with "!" correspond to cell addresses */
//         if(z[0] === '!') continue;
//         console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
//     }
// });
