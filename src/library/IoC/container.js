const inversify = require("inversify");
const BooksRepository = require("../repositories/books-repository");

const container = new inversify.Container();
container.bind(BooksRepository).toSelf();

module.exports = container;