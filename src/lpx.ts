import * as XLSX from 'xlsx'
import * as fs from "fs";
import * as iconv from 'iconv-lite'

const workbook = XLSX.readFile(process.argv[2])
const worksheet = workbook.Sheets[workbook.SheetNames[0]]

//MAIN
saveAsProcFormat(sheet2arr(worksheet))

function getFileName(fileName: string): string {
    let array = fileName.split(/\.(?=[^.]+$)/);
    if (array[1] === 'xls' || array[1] === 'xlsx') {
        console.log()
        return 'Z001049.' + fileName.substring(8, fileName.indexOf('_')) + '_ENROLL001049x.' + getNumberOfDays()
    }
    return fileName
}

function getNumberOfDays(): string {
    // const one_day = 1000 * 60 * 60 * 24
    // const dayB = new Date()
    // const dayA = new Date(dayB.getFullYear(), 0, 0)
    const Difference_In_Days = Math.floor(Math.abs(new Date().getTime() - new Date(new Date().getFullYear(), 0, 0, 0, 0, 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    return (Difference_In_Days > 99 ? '' : '0') + Difference_In_Days.toFixed(0)
}

// function showArr(arr: Array<Array<string>>): void {
//     for (let i = 0; i < arr.length; i++) {
//         let line: Array<string> = arr[i]
//         for (let j = 0; j < line.length; j++) {
//             console.log(line[j])
//         }
//         console.log('\n')
//     }
// }

function saveAsProcFormat(arr: Array<Array<string>>): void {
    let content: string = ''
    // OutputStreamWriter
    // let writeStream = fs.createWriteStream('tst.txt')
    // writeStream.write('H 20200204 165748 IMMEDIATE')

    content += 'H ' + DateFormat(new Date(), 'yyyyMMdd HHmmss') + ' IMMEDIATE' + '\n'
    let numRec: number = 0
    for (let i = 0; i < arr.length; i++) {
        let line: Array<string> = arr[i]
        if ((line[0].trim().toLowerCase() === 'фио владельца карты') || (line[0].trim().toLowerCase().substring(0, 16) === 'итого держателей')) continue
        numRec++
        content += line[0]
        content += LPad(line[1], 116 - line[0].length)
        content += LPad(line[5].trim() + line[3].trim(), 18) + '\n'
        for (let j = 0; j < line.length; j++) {
            console.log(j + ' = ' + line[j])
        }
        // console.log('\n')
    }
    // writeStream.on('finish', () => {
    //     console.log('wrote all data to file')
    // })
    // console.log('numRec = ' + numRec)
    content += 'T' + LPad(numRec.toString(), 19) + '\n'
    fs.writeFileSync('tst.tx', content)
    fs.createReadStream('tst.tx')
        .pipe(iconv.decodeStream('utf-8'))
        .pipe(iconv.encodeStream('win1251'))
        .pipe(fs.createWriteStream(getFileName(process.argv[2])))

}

function sheet2arr(sheet: XLSX.WorkSheet): Array<Array<string>> {
    let result: Array<Array<string>> = []
    let row: Array<string> = []
    let rowNum: number
    let colNum: number = 0

    const range = XLSX.utils.decode_range(<string>sheet['!ref']) // get the range
    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        row = []
        for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
            let nextCell = sheet[
                XLSX.utils.encode_cell({r: rowNum, c: colNum})
                ]
            if (typeof nextCell === 'undefined') {
                row.push('undefined')
            } else row.push(nextCell.w)
        }
        result.push(row)
    }
    return result
}

function DateFormat(date: Date, template: string): string {
    let MM = date.getMonth() + 1
    let dd = date.getDate()
    let HH = date.getHours();
    let mm = date.getMinutes()
    let ss = date.getSeconds()
    // yyyyMMdd HHmmss
    // let yy = date.getFullYear()
    if (template === 'yyyyMMdd HHmmss')
        return '' + date.getFullYear() + (MM > 9 ? '' : '0') + MM + (dd > 9 ? '' : '0') + dd + ' '
            + (HH > 9 ? '' : '0') + HH + (mm > 9 ? '' : '0') + mm + (ss > 9 ? '' : '0') + ss
    if (template === 'yyyyMMdd')
        return '' + date.getFullYear() + (MM > 9 ? '' : '0') + MM + (dd > 9 ? '' : '0') + dd
    return '' + date.getFullYear() + (MM > 9 ? '' : '0') + MM + (dd > 9 ? '' : '0') + dd
}

// function RPad(input: string, len: number): string {
//     while (input.length < len)
//         input += ' '
//     return input
// }

function LPad(input: string, len: number): string {
    while (input.length < len)
        input = ' ' + input
    return input
}

//worksheet["!ref"].s.r

// for (let z in worksheet) {
//     /* all keys that do not begin with "!" correspond to cell addresses */
//     if(z[0] === '!') continue;
//     console.log(/*y + */"!" + z + "=" + JSON.stringify(worksheet[z].v));
// }


// sheet_name_list.forEach(function(y) { /* iterate through sheets */
//     var worksheet = workbook.Sheets[y];
//     for (let z in worksheet) {
//         /* all keys that do not begin with "!" correspond to cell addresses */
//         if(z[0] === '!') continue;
//         console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
//     }
// });
