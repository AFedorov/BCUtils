import * as fs from "fs"
import * as readline from 'readline'
import * as iconv from 'iconv-lite'

let data = ''
// let countLine: number = 0

let fileName = process.argv[2]


const readStream = fs.createReadStream(fileName)
    .pipe(iconv.decodeStream('win1251'))

readStream.on('data', function (chunk) {
    data += chunk
}).on('end', function () {
    processFile(data)
})

const processFile = (content: string) => {

    const lines: string[] = content.split(/\r?\n/);
    const linesLen = lines.length;

    // lines.forEach((value, index) => {
    //     if (index === 350) {
    //         console.log(value)
    //         console.log(lines[350])
    //     }
    // });


    let totalLen = 0
    let ACC_CardProductMap = new Map()

    for (let i = 0; i < linesLen; i++) {
    //     countLine++
    // //     const lineNumber = i + 1;
    // //     const line = lines[i];
        if (lines[i] === '   <Row>') {
            //Если пустое
            if (lines[i + 15].substring(1, 57) === '   <Cell><Data ss:Type=\"String\">          </Data></Cell>') {
                ACC_CardProductMap.set(lines[i + 3].substring(33, 49), getDataFromString(lines[i + 4]))
                // console.log(lines[i + 3].substring(33, 49))
                // console.log(getDataFromString(lines[i + 4])) //реализовать метод getDataFromString
            }
            // console.log(lines[i + 15])
            // console.log(lines[i + 15])
            // console.log(countLine)
        }
    }
    console.log(ACC_CardProductMap.get('5258335591011265'))
}

const getDataFromString = (str: string): string => {
    const dataPosIndex = str.indexOf('<Data')
    const aIndex = str.substring(dataPosIndex).indexOf('>') + 1
    const bIndex = str.indexOf('<\/Data>')
    return str.substring(aIndex, bIndex).trim()
}

// ----- read file with stream -----
// const readable = fs.createReadStream(fileName)
//     .pipe(iconv.decodeStream('win1251'))
//
// fs.stat(fileName, (err, stats) => {
//
//     readable.on('data', (chunk)=> {
//         processFile(chunk.toString())
//     });
//
//     readable.on('end', () => {
//         process.stdout.write("Successfully finished the operation");
//         return;
//     })
//
//     readable.on('error', (e) => {
//         console.log("Some error occurred: ", e);
//     })
//
// })
//------------------------------------

// function processFile(content: string) {
//
//     const lines: string[] = content.split(/\r?\n/);
//     const linesLen = lines.length;
//
//     let totalLen = 0;
//     for (let i = 0; i < linesLen; i++) {
//         countLine++
//         const lineNumber = i + 1;
//         const line = lines[i];
//         if (line === '   <Row>') {
//             console.log(lines[i + 15])
//             console.log(countLine)
//         }
//     }

    // for (const line of lines) {
    //     if (line === '   <Row>') {
    //         for (let i = 0; i < 15; i++) {
    //             countLine++
    //         }
    //     }
    //     if (line === '   </Row>') console.log('Row end')
    // }
    // //}
    // console.log(countLine)
// }

// const lines = sourceCode.getLines();
// const linesLen = lines.length;
//
// let totalLen = 0;
// for (let i = 0; i < linesLen; i++) {
//     const lineNumber = i + 1;
//     const line = lines[i];


// const authors: { name: string, email: string, knownAuthor?: Author }[] = [];
// const {output: [error, stdout, stderr]} = childProcess.spawnSync(`git`, ["shortlog", "-se", ...specs], { cwd: path.resolve(__dirname, "../") });
// if (error) {
//     console.log(stderr.toString());
// }
// else {
//     const output = stdout.toString();
//     const lines = output.split("\n");
//     lines.forEach(line => {
//         if (line) {
//             let match: RegExpExecArray | null;
//             if (match = outputRegExp.exec(line)) {
//                 authors.push({ name: match[1], email: match[2] });
//             }
//             else {
//                 throw new Error("Could not parse output: " + line);
//             }
//         }
//     });
//
//     const maps = getKnownAuthorMaps();
//
//     const lookupAuthor = ({name, email}: { name: string, email: string }) => {
//         return maps.authorsByEmail[email.toLocaleLowerCase()] || maps.authorsByName[name];
//     };
//
//     const knownAuthors = authors
//         .map(lookupAuthor)
//         .filter(a => !!a)
//         .map(getAuthorName);
//     const unknownAuthors = authors
//         .filter(a => !lookupAuthor(a))
//         .map(a => `${a.name} <${a.email}>`);
//
//     if (knownAuthors.length) {
//         console.log("\r\n");
//         console.log("Found known authors: ");
//         console.log("=====================");
//         deduplicate(knownAuthors).sort(sortAuthors).forEach(log);
//     }
//
//     if (unknownAuthors.length) {
//         console.log("\r\n");
//         console.log("Found unknown authors: ");
//         console.log("=====================");
//         deduplicate(unknownAuthors).sort(sortAuthors).forEach(log);
//     }
