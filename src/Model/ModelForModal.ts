import { BookResultDataInterface, DefinationInterface, DetailsInterfaceForBannedAndDelete, UserResultDataInterface } from "./ResultModel";

interface CreateModalInterface
{
    value?: number;
    data?: any;
}

interface CreateBookModalInterface
{
    image?:File;
    imageURL?:string;
    bookname?:string;
    language?:string;
    languageID?:string;
    genre?:string;
    genreID?:string;
    pages?:number;
    description?:string;
}

interface EditModalInterface
{
    value?: number;
    editData: UserResultDataInterface | DetailsInterfaceForBannedAndDelete | DefinationInterface | BookResultDataInterface | CreateBookModalInterface;
    compareData: UserResultDataInterface | DetailsInterfaceForBannedAndDelete | DefinationInterface | BookResultDataInterface | CreateBookModalInterface;
}

interface BanModalInterface
{
    _id:string;
    username:string;
    durationOption?:number;
    description?:string;
}

interface DeleteModalInterface
{
    _id:string;
    value?: number;
    type?: string;
    data: UserResultDataInterface | DefinationInterface | DefinationInterface;
}

interface DisplayDataModalInterface
{
    value:number;
    isAdmin:boolean;
    data: UserResultDataInterface | BookResultDataInterface;
}

interface ModalConfirmButtonInterface
{
    clickEvent:() => void;
    name:string;
    buttonType:string;
}

interface DisplayDataModalBody
{
    isAdmin?:boolean;
    data: UserResultDataInterface | BookResultDataInterface;
}

export type {CreateModalInterface, CreateBookModalInterface, EditModalInterface, BanModalInterface, DeleteModalInterface, DisplayDataModalInterface, ModalConfirmButtonInterface, DisplayDataModalBody}