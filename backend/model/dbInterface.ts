import { Types } from "mongoose";
import { CreateUserInterface } from './requestInterface'

export interface DBUserInterface extends CreateUserInterface
{
    _id:string;
    status:string;
    createdAt?:Date;
}

export interface BookInterface
{
    _id:Types.ObjectId;
    name: string
    author:string;
    publisher:string;
    genre:string;
    page:number;
    description:string;
    createdAt:Date;
}