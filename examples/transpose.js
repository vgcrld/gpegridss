const Fs = require('fs');
 
let inputStream = Fs.createReadStream('config_data.csv', 'utf8');
 
inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        console.log('A row arrived: ', row);
    })
    .on('end', function (data) {
        console.log('No more rows!');
    });