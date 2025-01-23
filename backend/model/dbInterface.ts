import { Types } from "mongoose";
import { CreateUserInterface } from './requestInterface'

export interface DBUserInterface extends CreateUserInterface
{
    _id:string;
    banned:boolean;
    createdAt?:Date;
}

export interface BookInterface
{
    _id:Types.ObjectId;
    author:string;
    title:string;
    content:string;
    tag:string;
    createdAt:Date;
}