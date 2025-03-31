import { ChangeEvent } from "react";
import { UserDataInterface } from "./UserTableModel";
import { BookTableDataInterface } from "./BookTableModel";
import { ContactInterface, DefinitionInterface } from "./ResultModel";

interface FirstRow 
{ 
    username: string; 
    role: string; 
}

interface SecondRow
{
    newName: string; 
    newPassword: string;
}

export interface ViewProfileModel extends SecondRow, FirstRow
{
    email: string;
    gender: string;
};

export interface LoginModel
{
    email:string,
    password:string
}

export interface RegisterModel extends LoginModel
{
    username: string; 
    birthDay: string;
}

export interface OptionFieldModel
{
    optionVisiable: boolean;
    onChange:(event: ChangeEvent<HTMLInputElement>) => void
    SearchField: { label: string; name: string; type: string; select?: boolean; slotProps?: object, options?: string[]} [];
    searchData: UserDataInterface;
}

export interface BookOptionFieldModal
{
    optionVisiable: boolean;
    onChange:(event: ChangeEvent<HTMLInputElement>, index?:number) => void;
    SearchField?: { label: string; name: string; type: string; select?: boolean; slotProps?: object, options?: string[]} [];
    searchData: BookTableDataInterface;
}
