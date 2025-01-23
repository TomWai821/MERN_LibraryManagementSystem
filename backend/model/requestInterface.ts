import { Types } from "mongoose";

export interface LoginInterface
{
    email:string;
    password:string;
}

export interface CreateUserInterface extends LoginInterface
{
    username:string;
    gender:string,
    birthDay:string,
    role:string;
}

export interface ChangeDataInterface
{
    _id:Types.ObjectId;
    oldUsername:string | null;
    newUsername:string | null;
    oldPassword:string | null;
    newPassword:string | null;
}

export interface UserInterface extends CreateUserInterface
{
    _id: Types.ObjectId;
    banned: boolean;
    createdAt:Date;
}

