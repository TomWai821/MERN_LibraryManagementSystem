import { BookDataInterface, BookDataInterfaceForEdit, DefinitionInterface, DetailsInterfaceForBannedAndDelete, UserResultDataInterface } from "./ResultModel";

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
}

export interface EditModalInterface
{
    value?: number;
    editData: UserResultDataInterface | DetailsInterfaceForBannedAndDelete | DefinitionInterface | BookDataInterfaceForEdit | CreateBookModalInterface;
    compareData: UserResultDataInterface | DetailsInterfaceForBannedAndDelete | DefinitionInterface | BookDataInterfaceForEdit | CreateBookModalInterface;
}

export interface BanModalInterface
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
    data: UserResultDataInterface | DefinitionInterface | DefinitionInterface;
}

export interface DisplayDataModalInterface
{
    value:number;
    isAdmin:boolean;
    data: UserResultDataInterface | BookDataInterface;
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
    data: UserResultDataInterface | BookDataInterface;
}
