import mongoose from "mongoose";
import { IDInterface } from "./userSchemaInterface";

interface BookInterface extends IDInterface
{
    bookname: string;
    languageID: mongoose.Schema.Types.ObjectId;
    genreID: mongoose.Schema.Types.ObjectId;
    publisherID: mongoose.Schema.Types.ObjectId;
    authorID: mongoose.Schema.Types.ObjectId;
    genre:string;
    page:number;
    description:string;
    createdAt:Date;
}

interface GenreInterface extends IDInterface
{
    genre:string
}

interface LanguageInterface extends IDInterface
{
    language:string;
}

interface ContractDataInterface
{
    phoneNumber:string;
    email:string;
}

interface PublisherInterface extends IDInterface, ContractDataInterface
{
    publisher:string;
    address:string;
}

interface AuthorInterface extends IDInterface, ContractDataInterface
{
    author:string;
}

interface BookFavouriteInterface extends IDInterface
{
    bookID: mongoose.Schema.Types.ObjectId;
    userID: mongoose.Schema.Types.ObjectId;
}

interface BookIssuedInterface extends IDInterface, BookFavouriteInterface
{
    dueDate: Date;
    issueDate: Date;
}

interface BookReturnInterface extends IDInterface
{
    issueID: mongoose.Schema.Types.ObjectId;
    returnDate: Date;
}

export { BookInterface, GenreInterface, LanguageInterface, PublisherInterface, AuthorInterface, BookFavouriteInterface, BookIssuedInterface, BookReturnInterface}