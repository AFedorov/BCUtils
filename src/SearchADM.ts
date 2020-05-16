const fs = require('fs');

try {
    // read contents of the file
    const data = fs.readFileSync('T:\\ADM\\magnit_last.csv', 'utf-8');
    const numAddr: Map<string, string> = new Map<string, string>();

    // split the contents by new line
    const lines: string[] = data.split(/\r?\n/);
    for (const line of lines) {
        const lineSplitted = line.split(';');
        numAddr.set(lineSplitted[12],lineSplitted[8])
    }

    // print all lines
    // lines.forEach((line: any) => {
    //     var lineSplitted = line.split(';');
    //     numAddr.set(lineSplitted[12],lineSplitted[8])
    //     // console.log(line);
    //     // console.log(lineSplitted[12])
    // });
    // console.log(numAddr)
    if (process.argv.length > 0) {
        for (let i = 2; i < process.argv.length; i++) {
            // console.log(`${process.argv[i]} =>`)
            let result: string = process.argv[i] + ' "';
            if (numAddr.has(process.argv[i]))
                result = result + numAddr.get(process.argv[i]);
            console.log(result + '"');
                // console.log(`${process.argv[i]} => ${numAddr.get(process.argv[i])}`)

            // console.log(`argArray[${i}] = ${process.argv[i]}`);
            // // use JavaScript arguments variable
            // console.log(`arguments[${i}] = ${process.argv[i]}`)
        }
    }
} catch (err) {
    console.error(err);
}


// var iconvlite = require('iconv-lite');
// var fs = require('fs');
//
// function readFileSync_encoding(filename, encoding) {
//     var content = fs.readFileSync(filename);
//     return iconvlite.decode(content, encoding);
// }


// Rest parameters
// ===============
// import {AnyAaaaRecord} from "dns";

    // if (process.argv.length > 0) {
    //     for (var i = 0; i < process.argv.length; i++) {
    //         console.log(`argArray[${i}] = ${process.argv[i]}`);
    //         // use JavaScript arguments variable
    //         console.log(`arguments[${i}] = ${process.argv[i]}`)
    //     }
    // }



// function testArguments(...argArray: any[]) {
//     if (argArray.length > 0) {
//         for (var i = 0; i < argArray.length; i++) {
//             console.log(`argArray[${i}] = ${argArray[i]}`);
//             // use JavaScript arguments variable
//             console.log(`arguments[${i}] = ${arguments[i]}`)
//         }
//     }
// }


// console.log(process.argv)
// testArguments(9, 10, 11, 12);
//
// testArguments(process.argv);



// class MyClass {
//     add(x: number, y: number) {
//         return x + y;
//     }
// }
//
// let classInstance  = new MyClass();
// let result = classInstance.add(1, 2);
// console.log(`add(1,2) returns ${result}`);
//
// function concatStringsDefault(a: string, b: string, c: string = "c") {
//     return a + b + c;
// }
//
// var defaultConcat = concatStringsDefault("a", "b");
// console.log(`defaultConcat : ${defaultConcat}`);
