import express from "express";
import {container} from "../../IoC/container";
import {BooksRepository} from "../../repositories/books-repository";
import {fileMiddleware} from "../../middleware/file";
const router = express.Router();

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
    const repo = container.get(BooksRepository);
    const book = repo.getBooks();
    res.json(book);
});

router.get('/books/:id', (req, res) => {
    const {id} = req.params;
    const repo = container.get(BooksRepository);
    const book = repo.getBook(id);

    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json("No book");
    }
});

router.post('/books/', 
    fileMiddleware.single('fileBook'),    
    (req, res) => {
        const fileBook = req.file ? req.file.path: "";
        const fileName = req.file ? req.file.originalname: "";
        const {title, description, authors, favorite, fileCover} = req.body;

        const newBook = {title, description, authors, favorite, fileCover, fileName, fileBook};
        const repo = container.get(BooksRepository);
        repo.createBook(newBook);
    
        res.status(201);
        res.json(newBook);
});

router.put('/books/:id', 
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
                res.json(bookUpdate);
            } else {
                res.status(404);
                res.json("No book");
            }
        } else {
            res.status(404);
            res.json("No book");
        }
});

router.delete('/books/:id', (req, res) => {
    const {id} = req.params;

    if (id) {
        const repo = container.get(BooksRepository);
        const book = repo.deleteBook(id);
        if (book) {
            res.json("ok");
        } else {
            res.status(404);
            res.json("book | not found");
        }
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.get('/books/:id/download', (req, res) => {
    const {id} = req.params;
    const repo = container.get(BooksRepository);
    const book = repo.getBook(id);
    if (book) {
        res.download(book.fileBook, book.fileName, err=>{
            if (err){
                res.status(404);
                res.json(err);
            }
        });
    }
});

export const libraryApiRouter = router;