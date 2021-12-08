import express from "express";

import {homeRouter} from "./routes";
import {libraryRouter} from "./routes/library";
import {libraryApiRouter} from "./routes/api/library";
import {loginRouter} from "./routes/api/login";
import {errorMiddleware} from "./middleware/error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/', homeRouter);
app.use('/library', libraryRouter);
app.use('/api', libraryApiRouter);
app.use('/login', loginRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});