const express = require('express');
const router = express.Router();
const {Book} = require('../models');
const fileMiddleware = require('../middleware/file');

const data = {
    book: [],
};

router.get('/', (req, res) => {
    const {book} = data;
    res.render("library/index", {
        title: "Библиотека",
        books: book,
    });
});

router.get('/book/create', (req, res) => {
    res.render("library/create", {
        title: "Добавление книги",
        book: {},
    });
});

router.post('/book/create',
    fileMiddleware.single('fileBook'),    
    (req, res) => {
        const {book} = data;
        if (req.file) {
            const {path,originalname} = req.file;
            const {id, title, description, authors, favorite, fileCover} = req.body;

            const newBook = new Book(id, title, description, authors, favorite, fileCover, originalname, path);
            book.push(newBook);
        
            res.redirect('/library');
        } else {
            res.status(404).redirect('/404');
        }
});

router.get('/book/:id', (req, res) => {
    const {book} = data;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    if (idx !== -1) {
        res.render("library/view", {
            title: book[idx]['title'],
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/files/books/:file', function(req, res){
    const {file} = req.params;
    const path = `${__dirname}/../files/books/${file}`;
    res.download(path);
});

router.get('/book/update/:id', (req, res) => {
    const {book} = data;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("library/update", {
            title: "Редактирование "+book[idx]['title'],
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/book/update/:id',
    fileMiddleware.single('fileBook'),    
    (req, res) => {
        const {book} = data;
        const {path,originalname} = req.file;
        const {title, description, authors, favorite, fileCover} = req.body;
        const {id} = req.params;
        const idx = book.findIndex(el => el.id === id);
        if (idx !== -1) {
            if (req.file) {
                const newBook = new Book(id, title, description, authors, favorite, fileCover, originalname, path);
                book[idx] = newBook;
            
                res.redirect('/library');
            } else {
                res.status(404).redirect('/404');
            }
        } else {
            res.status(404).redirect('/404');
        }
});

router.post('/book/delete/:id', (req, res) => {
    const {book} = data;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.redirect(`/library`);
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;