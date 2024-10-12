import { Types } from "mongoose";

export interface createUserInterface extends loginInterface
{
    name:string;
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
    _id: Types.ObjectId;
    banned: boolean;
    createdAt:Date;
}

export interface changeDataInterface
{
    _id:Types.ObjectId;
    oldUsername:string | null;
    newUsername:string | null;
    oldPassword:string | null;
    newPassword:string | null;
}
