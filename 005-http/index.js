const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const http = require('http');

const weatherstackAPI = process.env.weatherstackAPI;
const weatherstackUrl = `http://api.weatherstack.com/current?access_key=${weatherstackAPI}`;

if (argv.city) {
    const requestUrl = weatherstackUrl+`&query=${argv.city}`;
    http.get(requestUrl, (res) => {
        const statusCode = res.statusCode;
        if (statusCode !== 200) {
            console.log(`Status Code: ${statusCode}`);
            return;    
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
            let parsedData = JSON.parse(rawData);
            console.log(parsedData);
        });
    }).on('error', (e) => {
        console.error(`error: ${e.message}`);
    });
} else {
    console.log('Укажите аргумент city с вашим городом, для получения погоды');
}