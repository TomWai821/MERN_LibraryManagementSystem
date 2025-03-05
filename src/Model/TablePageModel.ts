import { ChangeEvent } from "react";
import { UserResultDataInterface } from "./ResultModel";

interface IsAdminInterface
{
    isAdmin:boolean;
}

interface PagesInterface extends IsAdminInterface
{
    role: string | undefined;
    isLoggedIn: boolean;
    avatarUrl: string | undefined;
    status: string | undefined;
}

interface FilterInterface extends IsAdminInterface
{
    value:number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchData: UserDataInterface | BookSearchInterface;
    Search: () => void;
}

interface BookSearchInterface
{
    bookname:string;
    language:string;
    genre:string;
    author:string;
    publisher:string;
    pages:string;
}

interface BookDataInterface extends BookSearchInterface
{
    amount:string;
}

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

interface ActionTableCellInterface extends IsAdminInterface
{
    TableName: string;
    Information: UserDataInterface | BookDataInterface;
}

interface CreateModalInterface
{
    bookData?: UserDataInterface | BookDataInterface;
}

interface EditModalInterface
{
    editData: UserResultDataInterface | BookDataInterface;
    compareData: UserResultDataInterface | BookDataInterface;
}

interface TableInterface extends IsAdminInterface
{
    isLoggedIn: boolean;
}

interface BookRecordTableInterface extends TableInterface
{
    value: number;
    bookData: BookDataInterface[];
}

interface UserDataTableInterface extends IsAdminInterface
{
    value: number;
    userData: UserResultDataInterface[][];
    paginationValue: number;
}

interface TabInterface extends IsAdminInterface
{
    tabLabel: { label: string; }[];
    value: number;
    paginationValue: number;
    valueChange: (type:string ,newValue: number) => void;
    paginationOption: number[];
}

interface OptionFieldsInterface
{
    value: number; 
    type:string; 
    optionVisiable:boolean; 
    onChange:(event: ChangeEvent<HTMLInputElement>) => void;
    searchData: any;
}

interface BanModalInterface
{
    _id:string;
    username:string;
    durationOption?:number;
    description?:string;
}

export type {IsAdminInterface, PagesInterface, BookSearchInterface, BookDataInterface, UserDataInterface, FindUserInterface, CreateUserInterface, ActionTableCellInterface, FilterInterface, CreateModalInterface, EditModalInterface, BookRecordTableInterface, UserDataTableInterface, TabInterface, OptionFieldsInterface, BanModalInterface}