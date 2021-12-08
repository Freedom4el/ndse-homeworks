import { Request, Response } from "express";
import multer from "multer";
import { v4 as uuid} from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'files/books')
  },
  filename(req, file, cb) {
    cb(null, `${uuid()}-${file.originalname}`)
  }
});

const allowedTypes = ['application/pdf', 'text/plain', 'application/book', 'text/xml'];

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileMiddleware = multer({
  storage, fileFilter
});