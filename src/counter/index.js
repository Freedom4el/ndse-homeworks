const express = require('express');
const cors = require('cors');
const counterRouter = require('./routes/counter');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

app.use('/counter', counterRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});