import { IDInterface } from "./userSchemaInterface";

interface LoginInterface
{
    email:string;
    password:string;
}

interface CreateUserInterface extends LoginInterface
{
    username: string;
    gender: string,
    birthDay: string,
    role: string;
    status: string;
}

interface ChangeDataInterface extends IDInterface
{
    oldUsername: string | null;
    newUsername: string | null;
    oldPassword: string | null;
    newPassword: string | null;
}

interface UserInterface extends CreateUserInterface, IDInterface
{
    createdAt: Date;
}

export type {LoginInterface, CreateUserInterface, ChangeDataInterface, UserInterface}
