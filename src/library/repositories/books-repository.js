const Book = require("../models/Book");
const inversify = require("inversify");

class BooksRepository {
    async createBook(book){
        const newBook = new Book(book);
        return await newBook.save(book);
    }
    async getBook(id){
        return await Book.findById(id);
    }
    async getBooks(){
        return await Book.find();
    }
    async updateBook(id, updateBook){
        return await Book.findByIdAndUpdate(id, updateBook);
    }
    async deleteBook(id){
        return await Book.deleteOne({_id: id});
    }
}
inversify.decorate(inversify.injectable(), BooksRepository);
module.exports = BooksRepository;