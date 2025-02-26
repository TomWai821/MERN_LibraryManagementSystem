import mongoose from "mongoose";
import { CreateUserInterface } from "./requestInterface";

interface IDInterface
{
    _id: mongoose.Schema.Types.ObjectId;
}

interface UserInterface extends CreateUserInterface, IDInterface
{
    status:string;
    createdAt?:Date;
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

interface DeleteListInterface extends IDInterface
{
    userID: mongoose.Schema.Types.ObjectId;
    startDate: Date;
    dueDate: Date;
}

interface BanListInterface extends DeleteListInterface
{
    description: string;
}

export {IDInterface, UserInterface, RoleInterface, GenderInterface, StatusInterface, BanListInterface, DeleteListInterface}