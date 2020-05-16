import {Workbook} from 'exceljs'
import iconv from 'iconv-lite'
import fs from "fs";

// const fs = require('fs');
const fileName = 'T:\\ADM\\magnit_last.csv'
const fileNameXLS = 'T:\\5nt\\LOAD\\AddressByKLADR.xlsx'
const fileNameDevXLS = 'T:\\5nt\\LOAD\\Devices.xlsx'
const fileNameAcc = 'T:\\5nt\\LOAD\\ACC'

const workbook = new Workbook()
const wbDev = new Workbook()
// const worksheet = workbook.addWorksheet('AddressINFO')

//main begin
buildFileLoadAddress()
workbook.xlsx.writeFile(fileNameXLS).then(() => {
    console.log('File ' + fileNameXLS + ' builded')
})

buildFileLoadDevices()
wbDev.xlsx.writeFile(fileNameDevXLS).then(() => {
    console.log('File ' + fileNameDevXLS + ' builded')
})

buildFileLoadAcc()

//main end

function getAddressByTID(tidID: string): string {
    let result: string = ''
    let numAddr: Map<string, string> = getMapNumAndAddresses(fileName)
    if (numAddr.has(tidID))
        result = <string>numAddr.get(tidID)
    return result
}

function getMapNumAndAddresses(fileName: string): Map<string, string> {
    let result: Map<string, string> = new Map<string, string>()
    try {
        const data = fs.readFileSync(fileName, 'utf-8')
        const lines: string[] = data.split(/\r?\n/)
        for (const line of lines) {
            const lineSplitted = line.split(';')
            result.set(lineSplitted[12], lineSplitted[8])
        }
    } catch (err) {
        console.error(err)
    }
    return result
}

function buildOfficeNumByAddress(address: string): string {
    if (address.indexOf('Белгородская обл') >= 0)
        return '049/2008'
    if (address.indexOf('Липецкая обл') >= 0)
        return '049/2006'
    if (address.indexOf('Курская обл') >= 0)
        return '049/2010'
    if (address.indexOf('Тамбовская обл') >= 0)
        return '049/2004'
    return '049/0000'
}

function buildFileLoadAddress(): void {
    const worksheet = workbook.addWorksheet('AddressINFO')
    worksheet.columns = [
        {header: 'N п/п', key: '', width: 5},
        {header: 'Наименование филиала', key: '', width: 22},
        {header: 'Номер устройства', key: '', width: 7},
        {header: 'Адрес исходный(необяз.)', key: '', width: 85},
        {header: 'Страна', key: '', width: 10},
        {header: 'Индекс', key: '', width: 7},
        {header: 'Регион', key: '', width: 20},
        {header: 'Район', key: '', width: 15},
        {header: 'Город', key: '', width: 15},
        {header: 'Населенный пункт', key: '', width: 15},
        {header: 'Улица', key: '', width: 25},
        {header: 'Дом', key: '', width: 7},
        {header: 'Корпус', key: '', width: 7},
        {header: 'Строение', key: '', width: 7},
        {header: 'Квартира', key: '', width: 7}
    ]

    const rowValues = []
    for (let i = 2; i <= process.argv.length - 1; i++) {
        rowValues[1] = i - 1
        rowValues[2] = 'ГПБ (АО) в г. Воронеже'
        rowValues[3] = process.argv[i]
        rowValues[4] = getAddressByTID(process.argv[i])
        rowValues[5] = 'Россия'

        let lines: string[]
        if (process.argv.length === 4 && process.argv[3].length !== 6) {
            lines = process.argv[3].split(/,/)
            i += 2
        } else
            lines = (getAddressByTID(process.argv[i])).split(/,/)

        rowValues[6] = lines[0].trim()
        rowValues[7] = lines[1].trim()
        if (lines[2].trim().substring(lines[2].trim().length - 1) === 'г') {
            rowValues[8] = ''
            rowValues[9] = lines[2].trim()
            rowValues[10] = ''
            rowValues[11] = lines[3].trim()
            // rowValues[12]  = lines[4].trim()

            if (lines[4] !== 'undefined')
                rowValues[12] = lines[4].trim().substring(6, lines[4].trim().length)
            else
                rowValues[12] = ''
        } else {
            rowValues[8] = lines[2].trim()
            rowValues[9] = ''
            rowValues[10] = lines[3].trim()
            rowValues[11] = lines[4].trim()
            rowValues[12] = lines[5].trim().substring(6, lines[4].trim().length)
        }
        worksheet.addRow(rowValues)
    }
}

function buildFileLoadDevices(): void {

    const worksheet = wbDev.addWorksheet('devicesINFO')

    worksheet.columns = [
        {header: 'N п/п', key: '', width: 15}, //1
        {header: 'Сокращение Филиала', key: '', width: 15}, //ГПБ (АО) в г. Воронеже
        {header: 'Финансовая операция устройства', key: '', width: 15}, //ДогУстТСП
        {header: 'Номер устройства', key: '', width: 15}, //518541
        {header: 'Наименование устройства', key: '', width: 15}, //518541
        {header: 'Сокращение владельца устройства', key: '', width: 15}, //ООО "НТ Коллектив"
        {header: 'Наименование  владельца устройства', key: '', width: 15}, //ООО "Новоусманский транспортный коллектив"
        {header: 'Дата действия устройства', key: '', width: 15}, //22.11.2019
        {header: 'Код устройства', key: '', width: 15}, //518541
        {header: 'Тип устройства', key: '', width: 15}, //POS
        {header: 'Адрес устройства', key: '', width: 15}, //Воронежская область ул. Солнечная, д. 30 В, ОФ. 2
        {header: 'Установлен на территории подразделения', key: '', width: 15}, //049/0000
        {header: 'Признак, есть ли в устройстве прием наличных (CashIn)', key: '', width: 15}, //0
        {header: 'Номер Договора эквайринга', key: '', width: 15}, //2019-049-204
    ];

    const rowValues = [];

    for (let i = 2; i <= process.argv.length - 1; i++) {
        console.log(process.argv[i])
        rowValues[1] = i - 1
        rowValues[2] = 'ГПБ (АО) в г. Воронеже'
        rowValues[3] = 'ДогУстАТМ'
        rowValues[4] = process.argv[i] //'518541'
        rowValues[5] = process.argv[i] //'518541'
        rowValues[6] = 'ГПБ (АО) в г. Воронеже'
        rowValues[7] = 'Ф-л Банка ГПБ (АО) \"Центрально-Черноземный\"'
        rowValues[8] = new Date //'22.11.2019'
        rowValues[9] = process.argv[i] //'518541'
        rowValues[10] = 'POS'
        rowValues[11] = getAddressByTID(process.argv[i]) //'Воронежская область ул. Солнечная, д. 30 В, ОФ. 2'
        rowValues[12] = buildOfficeNumByAddress(rowValues[11])
        rowValues[13] = '0'
        rowValues[14] = '' //'2019-049-204'

        worksheet.addRow(rowValues);
    }
}

function buildFileLoadAcc(): void {
    let dataAcc: string = ''
    let devList: string = ''

    for (let i = 2; i <= process.argv.length - 1; i++) {
        devList += '_' + process.argv[i]
        dataAcc += 'ГПБ (АО) в г. Воронеже^20208810K00490' + process.argv[i] + '^^^' + process.argv[i] + '^^ ^111^20208810K00490' + process.argv[i] + '\n' +
            'ГПБ (АО) в г. Воронеже^60322810K49009' + process.argv[i] + '^^^' + process.argv[i] + '^^ ^111^60322810K49009' + process.argv[i] + '\n' +
            'ГПБ (АО) в г. Воронеже^60323810K49009' + process.argv[i] + '^^^' + process.argv[i] + '^^ ^111^60323810K49009' + process.argv[i] + '\n' +
            'ГПБ (АО) в г. Воронеже^60324810K81006' + process.argv[i] + '^^^' + process.argv[i] + '^^ ^111^60324810K81006' + process.argv[i] + '\n'
    }
    // console.log(dataAcc)
    // const buf = iconv.decode(new Buffer(dataAcc), 'win1251')
    // console.log(buf)
    fs.writeFile(fileNameAcc + devList + '.tx', dataAcc, function (err: any) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    });
    fs.createReadStream(fileNameAcc + devList + '.tx')
        .pipe(iconv.decodeStream('utf-8'))
        .pipe(iconv.encodeStream('win1251'))
        .pipe(fs.createWriteStream(fileNameAcc + devList + '.txt'))

    fs.unlinkSync(fileNameAcc + devList + '.tx')//, function (err: any) {
    //     if (err) {
    //         return console.error(err);
    //     }
    //     console.log("File deleted!");
    // });
}


//     OutputStreamWriter
//     fileWriter = new OutputStreamWriter(new FileOutputStream("C:\\5nt\\LOAD\\счета АДМ-" + args[0] + ".txt", true), "Cp1251");
//     for (int i = 0;
//     i < args.length;
//     i++
// )
//     {
//         System.out.println(args.length);
//         if (args[i] == "") continue;
//         fileWriter.write("ГПБ (АО) в г. Воронеже^20208810K00490" + args[i] + "^^^" + args[i] + "^^ ^111^20208810K00490" + args[i] + "\n");
//         fileWriter.write("ГПБ (АО) в г. Воронеже^60322810K49009" + args[i] + "^^^" + args[i] + "^^ ^111^60322810K49009" + args[i] + "\n");
//         fileWriter.write("ГПБ (АО) в г. Воронеже^60323810K49009" + args[i] + "^^^" + args[i] + "^^ ^111^60323810K49009" + args[i] + "\n");
//         fileWriter.write("ГПБ (АО) в г. Воронеже^60324810K81006" + args[i] + "^^^" + args[i] + "^^ ^111^60324810K81006" + args[i] + "\n");
//     }
//     fileWriter.close();
