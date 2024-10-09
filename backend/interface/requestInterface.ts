import { Types } from "mongoose";

export interface createUserInterface
{
    email:string;
    name:string;
    password:string;
    gender:string,
    birthDay:string,
    role:string;
}

export interface loginInterface
{
    email:string;
    password:string;
}

export interface UserInterface extends createUserInterface
{
    _id:Types.ObjectId;
    banned: boolean;
}

export interface changeData
{
    _id:Types.ObjectId;
    oldUsername:string | null;
    newUsername:string | null;
    oldPassword:string | null;
    newPassword:string | null;
}
