const express = require('express');

const {Book} = require('./models');
const data = {
    book: [],
};

const app = express();

app.use(express.json());

app.post('/api/user', (req, res) => {
    res.status(201);
    const user = {
        id: 1, 
        mail: "test@mail.ru"
    };
    res.json(user);
});

app.post('/login', (req, res) => {
    res.status(201);
    const user = {
        id: 1, 
        mail: "test@mail.ru"
    };
    res.json(user);
});

app.get('/api/books/', (req, res) => {
    const {book} = data;
    res.json(book);
});

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books/', (req, res) => {
    const {book} = data;
    const {id, title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
    book.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const {book} = data;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
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
            fileName
        };
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("No book");
    }
});

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});