const express = require('express');
const router = express.Router();

const fileMiddleware = require('../../middleware/file');

const {Book} = require('../../models');
const data = {
    book: [],
};

router.use(express.json());

router.post('/user', (req, res) => {
    res.status(201);
    const user = {
        id: 1, 
        mail: "test@mail.ru"
    };
    res.json(user);
});

router.get('/books/', (req, res) => {
    const {book} = data;
    res.json(book);
});

router.get('/books/:id', (req, res) => {
    const {book} = data;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("No book");
    }
});

router.post('/books/', 
    fileMiddleware.single('fileBook'),    
    (req, res) => {
        const {book} = data;

        if (req.file) {
            const {path,originalname} = req.file;
            const {id, title, description, authors, favorite, fileCover} = req.body;

            const newBook = new Book(id, title, description, authors, favorite, fileCover, originalname, path);
            book.push(newBook);
        
            res.status(201);
            res.json(newBook);
        } else {
            res.status(404);
            res.json("Error upload book");
        }
});

router.put('/books/:id', 
    fileMiddleware.single('fileBook'),
    (req, res) => {
        const {book} = data;
        const {path,originalname} = req.file;
        const {title, description, authors, favorite, fileCover} = req.body;
        const fileName = originalname;
        const fileBook = path;
        const {id} = req.params;
        const idx = book.findIndex(el => el.id === id);

        if (idx !== -1) {
            book[idx] = {
                ...book[idx],
                id,
                title,
                description,
                authors, 
                favorite, 
                fileCover,
                fileName,
                fileBook
            };
            res.json(book[idx]);
        } else {
            res.status(404);
            res.json("No book");
        }
});

router.delete('/books/:id', (req, res) => {
    const {book} = data;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.json("ok");
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.get('/books/:id/download', (req, res) => {
    const {book} = data;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    res.download(__dirname+'/../'+book[idx].fileBook, book[idx].fileName, err=>{
        if (err){
            res.status(404);
            res.json("No book");
        }
    });
});

module.exports = router;