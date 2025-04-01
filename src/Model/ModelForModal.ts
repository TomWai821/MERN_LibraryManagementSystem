import { BookDataInterface, BookDataInterfaceForEdit, DefinitionInterface, DetailsInterfaceForSuspendAndDelete, LoanBookInterface, UserResultDataInterface } from "./ResultModel";

export interface CreateModalInterface
{
    value?: number;
    data?: any;
}

export interface CreateBookModalInterface
{
    image?:File;
    imageURL?:string;
    bookname?:string;
    language?:string;
    languageID?:string;
    genre?:string;
    genreID?:string;
    author?:string; 
    authorID?:string; 
    publisher?:string; 
    publisherID?:string;
    description?:string;
    publishDate?:Date;
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
