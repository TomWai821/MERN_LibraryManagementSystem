import { UserResultDataInterface } from "./ResultModel";
import { IsAdminInterface } from "./TablePagesAndModalModel";

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

interface UserDataTableInterface extends IsAdminInterface
{
    value: number;
    userData: UserResultDataInterface[][];
    paginationValue: number;
}


interface BanModalInterface
{
    _id:string;
    username:string;
    durationOption?:number;
    description?:string;
}

export type {UserDataInterface, FindUserInterface, CreateUserInterface, UserDataTableInterface, BanModalInterface}