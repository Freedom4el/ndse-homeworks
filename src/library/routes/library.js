const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const container = require("../Ioc/container");
const BooksRepository = require("../repositories/books-repository");
const fileMiddleware = require('../middleware/file');
const axios = require('axios').default;

router.get('/', async (req, res) => {
    const repo = container.get(BooksRepository);
    const book = await repo.getBooks();
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
    async (req, res) => {
        const fileName = req.file.originalname;
        const fileBook = req.file.path;
        const {title, description, authors, favorite, fileCover} = req.body;

        const newBook = {title, description, authors, favorite, fileCover, fileName, fileBook};
        try {
            const repo = container.get(BooksRepository);
            await repo.createBook(newBook);
            res.redirect('/library');
        } catch (e) {
            console.error(e);
        }
});

router.get('/book/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        const repo = container.get(BooksRepository);
        book = await repo.getBook(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    let countBook;
    try {
        const responseCounterPost = await axios.post(`${process.env.COUNTER_URL}/counter/${id}/incr`, {});
        const responseCounterGet = await axios.get(`${process.env.COUNTER_URL}/counter/${id}`, {});
        countBook = responseCounterGet.data;
    } catch (error) {
        console.log(error);
    }
    res.render("library/view", {
        title: book['title'],
        book: book,
        count: (countBook)?countBook[id]:1
    });
});

router.get('/files/books/:file', function(req, res){
    const {file} = req.params;
    const path = `${__dirname}/../files/books/${file}`;
    res.download(path);
});

router.get('/book/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        const repo = container.get(BooksRepository);
        book = await repo.getBook(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("library/update", {
        title: "Редактирование "+book['title'],
        book: book,
    });
});

router.post('/book/update/:id',
    fileMiddleware.single('fileBook'),    
    async (req, res) => {
        const fileName = req.file.originalname;
        const fileBook = req.file.path;
        const {title, description, authors, favorite, fileCover} = req.body;
        const {id} = req.params;

        const updateBook = {title, description, authors, favorite, fileCover, fileName, fileBook};
        try {
            const repo = container.get(BooksRepository);
            await repo.updateBook(id, updateBook);
        } catch (e) {
            console.error(e);
            res.status(404).redirect('/404');
        }
    
        res.redirect(`/library/book/${id}`);
});

router.post('/book/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const repo = container.get(BooksRepository);
        await repo.deleteBook(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/library`);
});

module.exports = router;