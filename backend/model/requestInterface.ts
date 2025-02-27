import mongoose from "mongoose";
import { IDInterface } from "./userSchemaInterface";

interface LoginInterface
{
    email:string;
    password:string;
}

interface CreateUserInterface extends LoginInterface
{
    username: string;
    gender: string;
    role: string;
    birthDay: string;
    status: string;
}

interface ChangeDataInterface extends IDInterface
{
    oldUsername: string | null;
    newUsername: string | null;
    oldPassword: string | null;
    newPassword: string | null;
}

export type {LoginInterface, CreateUserInterface, ChangeDataInterface}
