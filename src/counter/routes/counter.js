const express = require('express');
const router = express.Router();
const fs = require("fs");

router.post('/:bookId/incr', (req, res) => {
    const {bookId} = req.params;
    fs.readFile('./file/counter.txt', 'utf8', function(error, data){
        if(error) throw error;
        let counterData;
        if (data) {
            counterData = JSON.parse(data);
            if(counterData[bookId]) {
                counterData[bookId] = counterData[bookId]+1;
            } else {
                counterData[bookId] = 1;
            }
        } else {
            counterData = {[bookId]: 1};
        }

        fs.writeFile('./file/counter.txt', JSON.stringify(counterData), function(error){
            if(error) throw error;
            res.status(201);
            res.json("true");
        });
    });
});

router.get('/:bookId', (req, res) => {
    const {bookId} = req.params;
    fs.readFile('./file/counter.txt', 'utf8', function(error, data){
        if(error) throw error;
        let counterData;
        if (data) {        
            counterData = JSON.parse(data);
            if (counterData[bookId]) {
                res.status(200);
                const countBook = {[bookId]:counterData[bookId]};
                res.json(countBook);
            } else {
                res.status(404);
                res.json("no counter id");
            }
        } else {
            res.status(404);
            res.json("no counter id");
        }
    });
});

module.exports = router;