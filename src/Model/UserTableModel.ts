import { UserResultDataInterface } from "./ResultModel";

interface UserDataInterface
{
    username:string;
    email:string;
    role:string;
    status:string;
    gender:string;
}

interface FindUserDateInterface extends UserDataInterface
{
    startDate:Date;
    dueDate:Date;
}

interface FindUserInterface extends FindUserDateInterface
{
    tableName?:string;
}

interface CreateUserInterface extends UserDataInterface
{
    password:string;
    birthDay:Date;
}

interface UserDataTableInterface
{
    value: number;
    userData: UserResultDataInterface[][];
    paginationValue: number;
}

export type {UserDataInterface, FindUserInterface, CreateUserInterface, UserDataTableInterface}