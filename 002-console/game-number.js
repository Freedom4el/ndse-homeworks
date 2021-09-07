const readline = require('readline');
const mystery = Math.floor(Math.random() * 101);

console.log('Загадано число в диапазоне от 0 до 100');

const input = readline.createInterface(process.stdin);

input.on('line', (data) => {
    if(data < mystery) {
        console.log('Больше');
    }
    if (data > mystery) {
        console.log('Меньше');
    }
    if (data == mystery) {
        console.log('Отгадано число '+mystery);
    }
});