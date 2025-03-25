import { ChangeEvent } from "react";
import { BookDataInterface, UserResultDataInterface } from "./ResultModel";
import { UserDataInterface } from "./UserTableModel";
import { BookTableDataInterface, BookSearchInterface } from "./BookTableModel"

export interface IsAdminInterface
{
    isAdmin:boolean;
}

export interface PagesInterface extends IsAdminInterface
{
    role?: string;
    isLoggedIn: boolean;
    avatarUrl?: string;
    status?: string;
    username?:string;
}

export interface FilterInterface extends IsAdminInterface
{
    value:number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchData: UserDataInterface | BookSearchInterface;
    Search: () => void;
}

export interface ActionTableCellInterface extends IsAdminInterface
{
    value: number;
    TableName: string;
    Information: UserResultDataInterface | BookDataInterface | BookTableDataInterface;
}


export interface TableInterface extends IsAdminInterface
{
    isLoggedIn: boolean;
}

export interface TabInterface extends IsAdminInterface
{
    tabLabel: { label: string; }[];
    value: number;
    paginationValue: number;
    valueChange: (type:string ,newValue: number) => void;
    paginationOption: number[];
}

export interface OptionFieldsInterface
{
    value: number; 
    type:string; 
    optionVisiable:boolean; 
    onChange:(event: ChangeEvent<HTMLInputElement>) => void;
    searchData: any;
}

export interface TableTitleInterface
{
    title:string;
    dataLength:number;
}

