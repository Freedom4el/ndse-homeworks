const fs = require('fs');
const readline = require('readline');

const path = require('path');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const sideCoin = [['1', 'Орел'], ['2', 'Решка']];
const games = 'games';
const win = 'win';
const lose = 'lose';

function start() {
    console.log('Введите 1 (Орел), 2 (Решка):');
}

start();

const input = readline.createInterface(process.stdin);

input.on('line', (cmd) => {
    let randomNumber = Math.floor(Math.random() * sideCoin.length);
    let winStat = 0;
    let loseStat = 0;
    if (cmd === '1' || cmd === '2') {
        if (cmd === sideCoin[randomNumber][0]) {
            console.log('Ты выиграл(a)!');
            winStat = 1;
        } else {
            console.log('Я выиграл!');
            loseStat = 1;
        }
        
        if (argv.log) {
            const fileLogPath = path.join(__dirname, 'log', argv.log);
            fs.readFile(fileLogPath, 'utf8' , (err, fileLog) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        let dataLog = {
                            [games]: 1,
                            [win]: winStat,
                            [lose]: loseStat
                        };
                        dataLog = JSON.stringify(dataLog);
                        fs.writeFile(fileLogPath,dataLog, (err) => {
                            if (err) throw new Error(err);
                        });
                        return;
                    } else {
                        console.error(err);
                        return;
                    }
                }
                let dataLog = JSON.parse(fileLog);
                dataLog[games] += 1;
                dataLog[win] += winStat;
                dataLog[lose] += loseStat;
                dataLog = JSON.stringify(dataLog);
                fs.writeFile(fileLogPath,dataLog, (err) => {
                    if (err) throw new Error(err);
                });
            });
        }
        start();
    } else {
        console.log('Вы ввели что то не то');
    }
});