import { ChangeEvent } from "react";
import { BookDataInterface, UserDataInterface } from "./TablePageModel";

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

interface ViewProfileModel extends SecondRow, FirstRow
{
    email: string;
    gender: string;
};

interface LoginModel
{
    email:string,
    password:string
}

interface RegisterModel extends LoginModel
{
    username: string; 
    birthDay: string;
}

interface OptionFieldModel
{
    optionVisiable: boolean;
    onChange:(event: ChangeEvent<HTMLInputElement>) => void
    SearchField: { label: string; name: string; type: string; select?: boolean; slotProps?: object, options?: string[]} [];
    searchData: BookDataInterface | UserDataInterface;
}

export type {ViewProfileModel, LoginModel, RegisterModel, OptionFieldModel}