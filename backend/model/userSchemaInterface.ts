import mongoose from "mongoose";
import { CreateUserInterface } from "./requestInterface";

interface IDInterface
{
    _id: mongoose.Schema.Types.ObjectId;
}

interface CreateAtInterface
{
    createdAt: Date;
}

interface UserInterface extends IDInterface, CreateUserInterface
{
    email: string;
    password: string;
    createdAt: Date;
}

interface RoleInterface extends IDInterface
{
    role:string;
}

interface GenderInterface extends IDInterface
{
    gender:string;
}

interface StatusInterface extends IDInterface
{
    status:string;
    description:string;
}

interface DeleteListInterface extends IDInterface, CreateAtInterface
{
    userID: mongoose.Schema.Types.ObjectId;
    startDate: Date;
    dueDate: Date;
}

interface BanListInterface extends DeleteListInterface, CreateAtInterface
{
    description: string;
}

export {IDInterface, CreateAtInterface, UserInterface, RoleInterface, GenderInterface, StatusInterface, BanListInterface, DeleteListInterface}