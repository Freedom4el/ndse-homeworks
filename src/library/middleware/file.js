const multer = require('multer');
const { v4: uuid} = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'files/books')
  },
  filename(req, file, cb) {
    cb(null, `${uuid()}-${file.originalname}`)
  }
});

const allowedTypes = ['application/pdf', 'text/plain', 'application/book', 'text/xml'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

module.exports = multer({
  storage, fileFilter
});