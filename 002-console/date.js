const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const currentDate = new Date();

if(argv._.includes('current')){
    if(argv.year) {
        const year = currentDate.getFullYear();
        console.log(year);
    }
    if(argv.month) {
        const month = currentDate.getMonth()+1;
        console.log(month);
    }
    if(argv.date) {
        const date = currentDate.getDate();
        console.log(date);
    } else {
        console.log(currentDate);
    }
}
if(argv._.includes('add')) {
    if(argv.year) {
        currentDate.setFullYear(currentDate.getFullYear()+Number(argv.year));
        console.log(currentDate);
    }
    if(argv.month) {
        currentDate.setMonth(currentDate.getMonth()+Number(argv.month));
        console.log(currentDate);
    }
    if(argv.date) {
        currentDate.setDate(currentDate.getDate()+Number(argv.date));
        console.log(currentDate);
    }
}
if(argv._.includes('sub')) {
    if(argv.year) {
        currentDate.setFullYear(currentDate.getFullYear()-Number(argv.year));
        console.log(currentDate);
    }
    if(argv.month) {
        currentDate.setMonth(currentDate.getMonth()-Number(argv.month));
        console.log(currentDate);
    }
    if(argv.date) {
        currentDate.setDate(currentDate.getDate()-Number(argv.date));
        console.log(currentDate);
    }
}