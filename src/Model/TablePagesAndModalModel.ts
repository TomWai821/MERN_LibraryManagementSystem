import { ChangeEvent } from "react";
import { BookDataInterface, ContactInterface, LoanBookInterface, UserResultDataInterface } from "./ResultModel";
import { UserDataInterface } from "./UserTableModel";
import { BookTableDataInterface, BookSearchInterface, SelfLoanBookSearchInterface, ContactSearchInterface } from "./BookTableModel"

export interface IsAdminInterface
{
    isAdmin?:boolean;
}

export interface PagesInterface extends IsAdminInterface
{
    role?: string;
    isLoggedIn: boolean;
    avatarUrl?: string;
    status?: string;
    username?:string;
}

interface AllFilterInterface
{
    value:number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    Search: () => void;
}

export interface FilterInterface extends IsAdminInterface, AllFilterInterface
{
    searchData: UserDataInterface | BookSearchInterface | SelfLoanBookSearchInterface;
    isLoggedIn?:boolean;
}

export interface ContactFilterInterface extends AllFilterInterface
{
    searchData: ContactSearchInterface;
}

export interface UserActionTableCellInterface
{
    Information: UserResultDataInterface | BookDataInterface | BookTableDataInterface | LoanBookInterface | ContactInterface;
}

export interface ActionTableCellInterface extends IsAdminInterface, UserActionTableCellInterface
{
    isLoggedIn?: boolean;
    value: number;
    TableName: string;
}

export interface RecordTableCellInterface extends IsAdminInterface
{
    value:number;
    isLoggedIn?: boolean;
    Information: LoanBookInterface;
}

export interface TableInterface extends IsAdminInterface
{
    isLoggedIn?: boolean;
}

export interface TabInterface extends IsAdminInterface
{
    isLoggedIn?:boolean;
    tabLabel: { label: string; }[];
    type:string;
    value: number;
    paginationValue?: number;
    valueChange: (type:string, newValue: number) => void;
    paginationOption?: number[];
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

