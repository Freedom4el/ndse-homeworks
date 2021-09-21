const express = require('express');

const libraryRouter = require('./routes/library');
const loginRouter = require('./routes/login');

const app = express();

app.use('/api', libraryRouter);
app.use('/login', loginRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});