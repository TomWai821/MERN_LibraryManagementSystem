import { CreateUserInterface } from "./requestInterface";

interface IDInterface
{
    _id:string;
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

interface BanListInterface extends IDInterface
{

}

interface DeleteListInterface extends IDInterface
{

}

export {IDInterface, UserInterface, RoleInterface, BanListInterface, DeleteListInterface}