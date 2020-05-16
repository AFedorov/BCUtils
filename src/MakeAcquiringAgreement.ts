import * as fs from "fs"
// import { readFile } from 'fs'
import * as iconv from 'iconv-lite'
// import * as excel from 'exceljs';
import { Workbook} from 'exceljs';

interface FirmData {
    Firm_NO: string
    INN: string
    Firm_Name: string
    Firm_Short_Name: string
    City: string
    NumberOfAgreement: string
    DateForTheAgreement: string
    CommercialConcession: string
    KPP: string
    BIC: string
    Account: string
    Address: string
    Terminals: string[]
}

fs.readFile(process.argv[2], (err, JSONString )=> {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        // let firmData: FirmData  = JSON.parse(iconv.decode(JSONString, 'win1251'))
        processFile(JSON.parse(iconv.decode(JSONString, 'win1251')))
    } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})

function processFile(content: FirmData) {
    makeAccFile(content)
    makeAgreementFile(content)
    makeDevicesFile(content)
    makeCommercialConcessionFile(content)
}

function makeAccFile(content: FirmData) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('CustomerINFO');

    worksheet.columns = [
        {header:'нн', key:'nn', width: 4 },
        {header:'Сокращение филиала', key:'Filial_Short_Name', width: 32 },
        {header:'Лицевой номер счета', key:'Account', width: 21 },
        {header:'ИНН владельца', key:'INN', width: 15 },
        {header:'Сокращение владельца счета', key:'Firm_Short_Name', width: 28 },
        {header:'Наименование владельца счета', key:'Firm_Name', width: 30 },
        {header:'Наименование счета', key :'Account_Name', width: 44 },
        {header:'Город владельца счета', key:'City', width: 24 },
        {header:'Группа счетов', key:'Account_Group', width: 12 },
        {header:'Приоритет свертки', key:'', width: 15 },
        {header:'Изображение сводного счета', key:'', width: 15 },
    ]

    const rowValues = []

    rowValues[1] = '1'
    rowValues[2] = 'ГПБ (АО) в г. Воронеже'
    rowValues[3] = '30232810004900' + content.Firm_NO
    rowValues[4] = content.INN
    rowValues[5] = content.Firm_Short_Name
    rowValues[6] = content.Firm_Name
    rowValues[7] = 'Незавершенные расчеты с ' + content.Firm_Short_Name
    rowValues[8] = content.City
    rowValues[9] = 'ЭквГруп'
    rowValues[10] = ''
    rowValues[10] = ''
    worksheet.addRow(rowValues)

    rowValues[1] = '2'
    rowValues[2] = 'ГПБ (АО) в г. Воронеже'
    rowValues[3] = '30233810004900' + content.Firm_NO
    rowValues[4] = content.INN
    rowValues[5] = content.Firm_Short_Name
    rowValues[6] = content.Firm_Name
    rowValues[7] = 'Задолженность ' + content.Firm_Short_Name
    rowValues[8] = content.City
    rowValues[9] = 'Экв30233'
    rowValues[10] = ''
    rowValues[10] = ''
    worksheet.addRow(rowValues)

    workbook.xlsx.writeFile('Acc2Retail.xlsx').then(() =>{
        console.log('File Acc2Retail OK');
    })
}

function makeAgreementFile(content: FirmData) {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('ContractINFO')

    worksheet.columns = [
        {header:'nn', key:'nn', width: 15 },
        {header:'Сокращение филиала	ГПБ (АО) в г. Воронеже', key:'', width: 15 },
        {header:'Номер договора эквайринга', key:'', width: 15 },
        {header:'Наименование договора эквайринга', key:'', width: 15 },
        {header:'Сокращение предприятия', key:'', width: 15 },
        {header:'Наименование предприятия', key:'', width: 15 },
        {header:'Дата заведения договора эквайринга', key:'', width: 15 },
        {header:'Комментарий к договору эквайринга', key:'', width: 15 },
        {header:'Код предприятия', key:'', width: 15 },
        {header:'БИК', key:'', width: 15 },
        {header:'Номер счета клиента', key:'', width: 15 },
        {header:'ИНН', key:'', width: 15 },
        {header:'КПП', key:'', width: 15 },
        {header:'Наименование клиента при отправке в другой банк', key:'', width: 15 },
        {header:'ФИО. Ответственное лицо', key:'', width: 15 },
        {header:'Должность, ответственное лицо', key:'', width: 15 },
        {header:'Документ (основание), ответственное лицо', key:'', width: 15 },
        {header:'Назначение платежа документа', key:'', width: 15 },
        {header:'Счет незавершенных расчетов с ТСП. Синтетика 30232', key:'', width: 15 },
        {header:'Счет по учету задолженности ТСП, синтетика 30233', key:'', width: 15 },
        {header:'Счет предприятия', key:'', width: 15 },
        {header:'Счет требований по комиссиям ТСП', key:'', width: 15 },
        {header:'Вид Договора', key:'', width: 15 },
        {header:'КБК', key:'', width: 15 },
        {header:'ОКТМО', key:'', width: 15 },
        {header:'Номер счета для указания торговой уступки', key:'', width: 15 },
        {header:'Статус составителя платежного документа (поле № 101 платежного поручения)', key:'', width: 15 },
        {header:'Основание платежа (поле № 106 платежного поручения)', key:'', width: 15 },
        {header:'Налоговый период (поле № 107 платежного поручения)', key:'', width: 15 },
        {header:'Номер документа-основания платежа (поле № 108 платежного поручения)', key:'', width: 15 },
        {header:'Дата документа -основания платежа', key:'', width: 15 },
        {header:'(поле № 109 платежного поручения)', key:'', width: 15 },
        {header:'Уникальный идентификатор документа (поле № 22 платежного поручения)', key:'', width: 15 },
    ]

    const rowValues = []

    rowValues[1]  =	'1'
    rowValues[2]  = 'ГПБ (АО) в г. Воронеже'
    rowValues[3]  = content.NumberOfAgreement
    rowValues[4]  = content.Firm_Short_Name
    rowValues[5]  = content.Firm_Short_Name
    rowValues[6]  = content.Firm_Name
    rowValues[7]  = content.DateForTheAgreement
    rowValues[8]  = '';
    rowValues[9]  = content.Firm_NO
    rowValues[10] = content.BIC
    rowValues[11] = content.Account
    rowValues[12] = content.INN
    rowValues[13] = content.KPP
    rowValues[14] = content.Firm_Short_Name
    rowValues[15] = ''
    rowValues[16] = ''
    rowValues[17] = ''
    rowValues[18] = 'Расчеты с ' + content.Firm_Short_Name +' (комиссия <TotalFee>) согласно договора. НДС нет'
    // rowValues[19] = cell.text
    rowValues[19] = '30232810004900' + content.Firm_NO
    rowValues[20] = '30233810004900' + content.Firm_NO
    rowValues[21] = '30102810600490000800'
    rowValues[22] = ''
    rowValues[23] = 'ДогТоргЭкв'
    rowValues[24] = ''
    rowValues[25] = ''
    rowValues[26] = ''
    rowValues[27] = ''
    rowValues[28] = ''
    rowValues[29] = ''
    rowValues[30] = ''
    rowValues[31] = ''
    rowValues[32] = ''
    rowValues[33] = ''

    worksheet.addRow(rowValues)

    workbook.xlsx.writeFile('Dog2Retail.xlsx').then(() =>{
        console.log('File Dog2Retail OK')
    })
}

function makeDevicesFile(content: FirmData) {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('DevicesNFO')

    worksheet.columns = [
        {header:'N п/п', key:'', width: 15 }, //1
        {header:'Сокращение Филиала', key:'', width: 15 }, //ГПБ (АО) в г. Воронеже
        {header:'Финансовая операция устройства', key:'', width: 15 }, //ДогУстТСП
        {header:'Номер устройства', key:'', width: 15 }, //518541
        {header:'Наименование устройства', key:'', width: 15 }, //518541
        {header:'Сокращение владельца устройства', key:'', width: 15 }, //ООО "НТ Коллектив"
        {header:'Наименование  владельца устройства', key:'', width: 15 }, //ООО "Новоусманский транспортный коллектив"
        {header:'Дата действия устройства', key:'', width: 15 }, //22.11.2019
        {header:'Код устройства', key:'', width: 15 }, //518541
        {header:'Тип устройства', key:'', width: 15 }, //POS
        {header:'Адрес устройства', key:'', width: 15 }, //Воронежская область ул. Солнечная, д. 30 В, ОФ. 2
        {header:'Установлен на территории подразделения', key:'', width: 15 }, //049/0000
        {header:'Признак, есть ли в устройстве прием наличных (CashIn)', key:'', width: 15 }, //0
        {header:'Номер Договора эквайринга', key:'', width: 15 }, //2019-049-204
    ]

    const rowValues = []

    // console.log(content.Terminals.length)
    for (let i = 0; i <= process.argv.length-2; i++) {
        // console.log(process.argv[i])
        rowValues[1]  = i + 1
        rowValues[2]  = 'ГПБ (АО) в г. Воронеже'
        rowValues[3]  = 'ДогУстТСП'
        rowValues[4]  = content.Terminals[i] //'518541'
        rowValues[5]  = content.Terminals[i] //'518541'
        rowValues[6]  = content.Firm_Short_Name //'ООО \"НТ Коллектив\"'
        rowValues[7]  = content.Firm_Name //'ООО \"Новоусманский транспортный коллектив\"'
        rowValues[8]  = content.DateForTheAgreement //'22.11.2019'
        rowValues[9]  = content.Terminals[i] //'518541'
        rowValues[10] = 'POS'
        rowValues[11] = content.Address //'Воронежская область ул. Солнечная, д. 30 В, ОФ. 2'
        rowValues[12] = '049/0000'
        rowValues[13] = '0'
        rowValues[14] = content.NumberOfAgreement //'2019-049-204'

        worksheet.addRow(rowValues)
    }

    workbook.xlsx.writeFile('Dev2Retail.xlsx').then(() =>{
        console.log('file Dev2Retail OK')
    })
}

function makeCommercialConcessionFile(content: FirmData) {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('CommercialConcessionINFO')

    worksheet.columns = [
        {header:'N п/п', key:'', width: 15 },
        {header:'Сокращение филиала', key:'', width: 15 }, //ГПБ (АО) в г. Воронеже
        {header:'Сокращение предприятия', key:'', width: 15 },
        {header:'Наименование предприятия', key:'', width: 15 },
        {header:'Номер договора эквайринга', key:'', width: 15 },
        {header:'Значение торговой уступки', key:'', width: 15 },
        {header:'«Свой», «Чужой», «Общий»', key:'', width: 15 },
        {header:'Платежная система', key:'', width: 15 },
        {header:'Тип карт', key:'', width: 15 },
        {header:'Приоритет', key:'', width: 15 },
        {header:'Дата В формате ДД.ММ.ГГГГ', key:'', width: 15 }
    ]

    const rowValues = []

    rowValues[1]  = 1
    rowValues[2]  = 'ГПБ (АО) в г. Воронеже'
    rowValues[3]  = content.Firm_Short_Name
    rowValues[4]  = content.Firm_Name
    rowValues[5]  = content.NumberOfAgreement
    rowValues[6]  = content.CommercialConcession
    rowValues[7]  = ''
    rowValues[8]  = ''
    rowValues[9]  = ''
    rowValues[10] = 1
    rowValues[11] = content.DateForTheAgreement

    worksheet.addRow(rowValues)

    workbook.xlsx.writeFile('CoC2retail.xlsx').then(() =>{
        console.log('file CoC2retail OK')
    });
}



// let firmData = {
//     "Firm_NO": "",
//     "INN": "",
//     "Firm_Name": "",
//     "Firm_Short_Name": "",
//     "City": "",
//     "NumberOfAgreement": "",
//     "DateForTheAgreement": "",
//     "KPP": "",
//     "BIC": "",
//     "Account": "",
//     "Address": "",
//     "Terminals": []
// }
// А вот пример создания нового файла, в котором будет содержаться строка data, после чего мы его переименовываем, а после переименования удаляем.
//
//     read.jsJavaScript
// var fs = require('fs');
//
// fs.writeFile("file.tmp", "data", function(err){
//     if(err)throw err;
//
//     fs.rename("file.tmp", "new.tmp", function(err){
//         if(err) throw err;
//
//         fs.unlink("new.tmp", function(err){
//             if(err) throw err;
//         });
//     });
//
// });
// Вы можете взглянуть на документацию ExcelJs, в которой четко указаны шаги для итерации строк на листе.
//
//     Функция worksheet.eachRow() которая позволяет вам это делать.
//
//     // Iterate over all rows that have values in a worksheet
//     worksheet.eachRow(function(row, rowNumber) {
//         console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
//         //Do whatever you want to do with this row like inserting in db, etc
//     });
//
//
// // Iterate over all rows (including empty rows) in a worksheet
// worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
//     console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
//     //Do whatever you want to do with this row like inserting in db, etc
// });