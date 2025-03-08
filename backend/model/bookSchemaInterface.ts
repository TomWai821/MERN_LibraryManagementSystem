import mongoose from "mongoose";
import { CreateAtInterface, IDInterface } from "./userSchemaInterface";

interface BookInterface extends IDInterface, CreateAtInterface
{
    bookname: string;
    languageID: mongoose.Schema.Types.ObjectId;
    genreID: mongoose.Schema.Types.ObjectId;
    publisherID: mongoose.Schema.Types.ObjectId;
    authorID: mongoose.Schema.Types.ObjectId;
    genre:string;
    page:number;
    description:string;
}

interface GenreInterface extends IDInterface, CreateAtInterface
{
    genre:string,
    shortName:string;
}

interface LanguageInterface extends IDInterface, CreateAtInterface
{
    shortName:string;
    language:string;
}

interface ContractDataInterface
{
    phoneNumber:string;
    email:string;
}

interface PublisherInterface extends IDInterface, ContractDataInterface, CreateAtInterface
{
    publisher:string;
    address:string;
}

interface AuthorInterface extends IDInterface, ContractDataInterface, CreateAtInterface
{
    author:string;
}

interface BookFavouriteInterface extends IDInterface, CreateAtInterface
{
    bookID: mongoose.Schema.Types.ObjectId;
    userID: mongoose.Schema.Types.ObjectId;
}

interface BookIssuedInterface extends IDInterface, BookFavouriteInterface, CreateAtInterface
{
    dueDate: Date;
    issueDate: Date;
    status: string;
}

interface BookReturnInterface extends IDInterface, CreateAtInterface
{
    issueID: mongoose.Schema.Types.ObjectId;
    returnDate: Date;
}

export { BookInterface, GenreInterface, LanguageInterface, PublisherInterface, AuthorInterface, BookFavouriteInterface, BookIssuedInterface, BookReturnInterface}