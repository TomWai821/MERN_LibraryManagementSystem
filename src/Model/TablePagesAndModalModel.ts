import { ChangeEvent } from "react";
import { UserResultDataInterface } from "./ResultModel";
import { UserDataInterface } from "./UserTableModel";
import { BookDataInterface, BookSearchInterface } from "./BookTableModel"

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

interface ActionTableCellInterface extends IsAdminInterface
{
    value: number;
    TableName: string;
    Information: UserResultDataInterface | BookDataInterface;
}


interface TableInterface extends IsAdminInterface
{
    isLoggedIn: boolean;
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



export type {IsAdminInterface, PagesInterface, ActionTableCellInterface, FilterInterface, TableInterface, TabInterface, OptionFieldsInterface}

