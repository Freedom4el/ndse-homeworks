require('dotenv').config();
const express = require('express');

const indexRouter = require('./routes/index');
const libraryRouter = require('./routes/library');
const libraryApiRouter = require('./routes/api/library');
const loginRouter = require('./routes/api/login');
const errorMiddleware = require('./middleware/error');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/library', libraryRouter);
app.use('/api', libraryApiRouter);
app.use('/login', loginRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoose.connect(`${process.env.DB_HOST}`,
            {   
                user: `${process.env.DB_USERNAME}`,
                pass: `${process.env.DB_PASSWORD}`,
                dbName: `${process.env.DB_NAME}`,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);       
        })   
    } catch (e) {
        console.log(e);   
    }
};
    
start();