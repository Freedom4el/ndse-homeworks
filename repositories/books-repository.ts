import {Book, IBook} from "../models/Book";
import inversify, { injectable } from "inversify";
const dataBook = new Map<string,Book>();

@injectable()
export class BooksRepository {
    createBook(book:Omit<IBook,"id">){
        const newBook = new Book(book);
        dataBook.set(newBook.id, newBook);
    }
    getBook(id:string){
        return dataBook.get(id);
    }
    getBooks(){
        const books = [];
        for (const value of dataBook.values()) {
            books.push(value);
        }
        return books;
    }
    updateBook(updateBook:IBook){
        const newBook = new Book(updateBook);
        dataBook.set(newBook.id, newBook);
        return dataBook.get(newBook.id);
    }
    deleteBook(id:string){
        dataBook.delete(id);
        return true;
    }
}