import { BookDataInterface, LoanBookInterface, UserResultDataInterface } from "./ResultModel";

export interface CreateModalInterface
{
    value?: number;
    data?: any;
}

export interface CreateContactModalInterface
{
    value?: number;
    author?: string;
    publisher?:string;
    email:string;
    phoneNumber?:string;
    address?:string;
}

export interface CreateBookModalInterface
{
    image?:File;
    imageURL?:string;
    bookname?:string;
    language?:string;
    genre?:string;
    author?:string; 
    publisher?:string; 
    publishDate?:Date;
    description?:string;
}

export interface EditModalInterface
{
    value?: number;
    editData: any;
    compareData: any;
}

export interface ReturnBookInterface
{
    modalOpenPosition:string;
    isAdmin: boolean;
    data:LoanBookInterface;
}

export interface SuspendModalInterface
{
    _id:string;
    username:string;
    durationOption?:number;
    description?:string;
}

export interface DeleteModalInterface
{
    _id:string;
    value?: number;
    type?: string;
    data: any;
}

export interface DisplayDataModalInterface
{
    position?: string;
    value: number;
    data: UserResultDataInterface | BookDataInterface | LoanBookInterface;
    isLoggedIn?: boolean;
    isAdmin?: boolean;
}

export interface ModalConfirmButtonInterface
{
    clickEvent:() => void;
    name:string;
    buttonType:string;
}

export interface DisplayDataModalBody
{
    isAdmin?:boolean;
    isLoggedIn?:boolean;
    data: UserResultDataInterface | BookDataInterface | LoanBookInterface;
}

export interface LoanBookModalInterface
{
    _id:string;
    bookname:string;
    author: string;
    language:string; 
    genre:string; 
    description:string; 
    imageUrl:string;
}
