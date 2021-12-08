import express from "express";
import {container} from "../IoC/container";
import {BooksRepository} from "../repositories/books-repository";
import {fileMiddleware} from "../middleware/file";
const router = express.Router();

router.get('/', (req, res) => {
    const repo = container.get(BooksRepository);
    const book = repo.getBooks();
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
        const fileBook = req.file ? req.file.path: "";
        const fileName = req.file ? req.file.originalname: "";
        const {title, description, authors, favorite, fileCover} = req.body;

        const newBook = {title, description, authors, favorite, fileCover, fileName, fileBook};
        const repo = container.get(BooksRepository);
        repo.createBook(newBook);
    
        res.redirect('/library');
});

router.get('/book/:id', (req, res) => {
    const {id} = req.params;
    const repo = container.get(BooksRepository);
    const book = repo.getBook(id);
    if (book) {
        res.render("library/view", {
            title: book['title'],
            book: book,
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/files/books/:file', function(req, res){
    const {file} = req.params;
    const path = `files/books/${file}`;
    res.download(path);
});

router.get('/book/update/:id', (req, res) => {
    const {id} = req.params;
    const repo = container.get(BooksRepository);
    const book = repo.getBook(id);

    if (book) {
        res.render("library/update", {
            title: "Редактирование "+book['title'],
            book: book,
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/book/update/:id',
    fileMiddleware.single('fileBook'),    
    (req, res) => {
        const fileBook = req.file ? req.file.path: "";
        const fileName = req.file ? req.file.originalname: "";
        const {title, description, authors, favorite, fileCover} = req.body;
        const {id} = req.params;
        const repo = container.get(BooksRepository);
        const book = repo.getBook(id);
        if (book) {
            const newBook = {id, title, description, authors, favorite, fileCover, fileName, fileBook};
            const bookUpdate = repo.updateBook(newBook);
            if (bookUpdate) {
                res.redirect('/library');
            } else {
                res.status(404).redirect('/404');
            }
        } else {
            res.status(404).redirect('/404');
        }
});

router.post('/book/delete/:id', (req, res) => {
    const {id} = req.params;

    if (id) {
        const repo = container.get(BooksRepository);
        const book = repo.deleteBook(id);
        if (book) {
            res.redirect(`/library`);
        } else {
            res.status(404).redirect('/404');
        }
    } else {
        res.status(404).redirect('/404');
    }
});

export const libraryRouter = router;