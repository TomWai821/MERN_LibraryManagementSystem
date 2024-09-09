import { Types } from "mongoose";

export interface createUserInterface
{
    email:string;
    name:string;
    password:string;
    role:string;
}

export interface loginInterface
{
    email:string;
    password:string;
}

export interface UserInterface
{
    _id:Types.ObjectId;
    name:string;
    email:string;
    password:string;
    banned: boolean;
}

export interface changePassword
{
    _id:Types.ObjectId;
    oldPassword:string;
    newPassword:string;
}
