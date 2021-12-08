import { v4 as uuid} from "uuid";

export class Book{
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
    constructor({id = uuid(), title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = ""}:Partial<IBook>) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
    }
}

export interface IBook {
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
}