import { ChangeEvent } from "react";

interface IsAdminInterface
{
    isAdmin:boolean;
}

interface PagesInterface extends IsAdminInterface
{
    role: string | undefined;
    isLoggedIn:boolean;
}

interface FilterInterface extends IsAdminInterface
{
    value:number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchData: UserDataInterface | BookSearchInterface;
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

interface FindUserInterface extends UserDataInterface
{
    startDate:Date;
    dueDate:Date;
}

interface CreateUserInterface extends UserDataInterface
{
    password:string;
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
    editData: UserDataInterface | BookDataInterface;
    compareData: UserDataInterface | BookDataInterface;
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
    userData: UserDataInterface[];
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


export type {IsAdminInterface, PagesInterface, BookSearchInterface, BookDataInterface, UserDataInterface, FindUserInterface, CreateUserInterface, ActionTableCellInterface, FilterInterface, CreateModalInterface, EditModalInterface, BookRecordTableInterface, UserDataTableInterface, TabInterface, OptionFieldsInterface}