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

interface PublisherInterface extends IDInterface
{
    publisher:string;
    address:string;
    phoneNumber:string;
}

interface AuthorInterface extends IDInterface
{
    author:string;
}

interface BookFavouriteInterface extends IDInterface
{

}

interface BookIssuedInterface extends IDInterface
{
    
}

interface BookReturnInterface extends IDInterface
{
    
}

export { BookInterface, GenreInterface, LanguageInterface, PublisherInterface, AuthorInterface, BookFavouriteInterface, BookIssuedInterface, BookReturnInterface}