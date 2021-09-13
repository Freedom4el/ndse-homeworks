const fs = require('fs');
const path = require('path');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

if (argv.log) {
    const fileLogPath = path.join(__dirname, 'log', argv.log);
    fs.readFile(fileLogPath, 'utf8' , (err, fileLog) => {
        if (err) throw new Error(err);
        let dataLog = JSON.parse(fileLog);
        var winPercentage = 100 * dataLog['win'] / (dataLog['win'] + dataLog['lose']);
        var losePercentage = 100 * dataLog['lose'] / (dataLog['win'] + dataLog['lose']);
        console.log('Количество игр: '+dataLog['games']);
        console.log('Количество побед: '+dataLog['win']);
        console.log('Количество поражений: '+dataLog['lose']);
        console.log('Процент побед: '+winPercentage+'%');
        console.log('Процент поражений: '+losePercentage+'%');
    });
}