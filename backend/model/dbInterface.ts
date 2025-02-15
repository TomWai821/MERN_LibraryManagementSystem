import { Types } from "mongoose";
import { CreateUserInterface } from './requestInterface'

interface UserInterface extends CreateUserInterface
{
    _id:string;
    status:string;
    createdAt?:Date;
}

interface BookInterface
{
    _id:Types.ObjectId;
    bookname: string
    author:string;
    publisher:string;
    genre:string;
    page:number;
    description:string;
    createdAt:Date;
}

interface RoleInterface
{
    
}

interface GenreInterface
{
    genreID:string;
    genre:string
}

export {UserInterface, BookInterface,  GenreInterface}