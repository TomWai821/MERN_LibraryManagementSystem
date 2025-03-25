import mongoose, { Document } from "mongoose";
import { IDInterface } from "./userSchemaInterface";

interface BookInterface extends IDInterface
{
    image: ImageInterface;
    bookname: string;
    languageID: mongoose.Schema.Types.ObjectId;
    genreID: mongoose.Schema.Types.ObjectId;
    authorID: mongoose.Schema.Types.ObjectId;
    publisherID: mongoose.Schema.Types.ObjectId;
    status:string;
    pages:number;
    description:string;
}

interface ImageInterface
{
    path:string;
    filename:string;
}

interface GenreInterface extends IDInterface
{
    genre:string,
    shortName:string;
}

interface LanguageInterface extends IDInterface
{
    shortName:string;
    language:string;
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

interface ContractDataInterface
{
    phoneNumber:string;
    email:string;
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
    status: string;
}

interface BookReturnInterface extends IDInterface
{
    issueID: mongoose.Schema.Types.ObjectId;
    returnDate: Date;
}

export { BookInterface, ImageInterface, GenreInterface, LanguageInterface, PublisherInterface, AuthorInterface, BookFavouriteInterface, BookIssuedInterface, BookReturnInterface}