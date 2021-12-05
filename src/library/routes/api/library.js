const express = require('express');
const router = express.Router();
const container = require("../../Ioc/container");
const BooksRepository = require("../../repositories/books-repository");
const fileMiddleware = require('../../middleware/file');

const Book = require('../../models/Book');

router.use(express.json());

router.post('/user', (req, res) => {
    res.status(201);
    const user = {
        id: 1, 
        mail: "test@mail.ru"
    };
    res.json(user);
});

router.get('/books/', async (req, res) => {
    const repo = container.get(BooksRepository);
    const book = await repo.getBooks();
    res.json(book);
});

router.get('/books/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        const repo = container.get(BooksRepository);
        book = await repo.getBook(id);
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404);
        res.json("No book");
    }
});

router.post('/books/', 
    fileMiddleware.single('fileBook'),    
    async (req, res) => {
        if (req.file) {
            const fileName = req.file.originalname;
            const fileBook = req.file.path;
            const {title, description, authors, favorite, fileCover} = req.body;

            const newBook = {title, description, authors, favorite, fileCover, fileName, fileBook};
        
            try {
                const repo = container.get(BooksRepository);
                await repo.createBook(newBook);
                res.json(newBook);
            } catch (e) {
                console.error(e);
                res.status(500).json();
            }
        } else {
            res.status(404);
            res.json("Error upload book");
        }
});

router.put('/books/:id', 
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
            res.redirect(`/api/books/${id}`);
        } catch (e) {
            console.error(e);
            res.status(500).json();
        }
});

router.delete('/books/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const repo = container.get(BooksRepository);
        await repo.deleteBook(id);
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.get('/books/:id/download', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        const repo = container.get(BooksRepository);
        book = await repo.getBook(id);
        res.download(__dirname+'/../../'+book['fileBook'], book['fileName'], err=>{
            if (err){
                res.status(404);
                res.json("No book");
            }
        });
    } catch (e) {
        console.error(e);
        res.status(404);
        res.json("No book");
    }
});

module.exports = router;