import { Types } from "mongoose";

export interface userInterface
{
    _id:string;
    name:string;
    email:string;
    password:string;
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