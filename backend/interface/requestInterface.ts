import { Types } from "mongoose";

export interface createUserInterface
{
    email:string;
    name:string;
    password:string;
}

export interface user
{
    _id:Types.ObjectId;
    name:string;
    email:string;
    password:string;
}