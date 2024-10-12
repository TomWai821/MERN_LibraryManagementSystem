import { Types } from "mongoose";
import { createUserInterface } from './requestInterface'

export interface DBUserInterface extends createUserInterface
{
    _id:string;
    banned:boolean;
    createdAt?:Date;
}

export interface noteInterface
{
    _id:Types.ObjectId;
    user:Types.ObjectId;
    title:string;
    content:string;
    tag:string;
    createdAt:Date;
}