import { ChangeEventHandler } from "react";

export interface ViewProfileProps
{
    name:string;
    gender:string;
    role:string;
    email:string;
}

export interface TableRowProps
{
    firstName:string;
    firstLabel:string;
    firstType:string;
    firstValue:string;
    secondName:string;
    secondLabel:string;
    secondType:string;
    secondValue:string;
    onChange:ChangeEventHandler<HTMLInputElement> | undefined;
    disabled:boolean;
}  