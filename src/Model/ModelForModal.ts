import { ChangeEvent, RefObject } from "react";
import { BookDataInterface, ContactInterface, LoanBookInterface, UserResultDataInterface } from "./ResultModel";
import { ChildProps } from "./ContextAndProviderModel";

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
    data: UserResultDataInterface | BookDataInterface | LoanBookInterface | ContactInterface;
    isLoggedIn?: boolean;
    isAdmin?: boolean;
}

export interface ModalConfirmButtonInterface
{
    clickEvent:() => void;
    name:string;
    buttonType:string;
}

export interface ExpandableTypographyInterface extends ChildProps
{
    title:string;
}

export interface DisplayDataModalBody
{
    isAdmin?:boolean;
    isLoggedIn?:boolean;
    data: UserResultDataInterface | BookDataInterface | LoanBookInterface | ContactInterface;
}

export interface BookDataBodyInterface
{
    BookData: Record<string, {label:string, value:any}>; 
    isLoggedIn:boolean; 
    status:string;
    descriptionData?:string; 
}

export interface GoogleBookDataInterface
{
    externalBookData: 
    {
        averageRating: string;
        ratingsCount: string;
        categories: string;
        listPrice: string;
        retailPrice: string;
        ISBN_13_Code: string;
        ISBN_10_Code: string;
    }; 
    RatingAsNumber:number;
}

export interface LoanBookModalInterface
{
    tabValue?: number;
    qrCodeData?: string;
    _id:string;
    bookname:string;
    author: string;
    language:string; 
    genre:string; 
    description:string; 
    imageUrl:string;
}

export interface QRCodeInterface
{
    username:string;
    authToken:string;
}

export interface UserLoanBookModalBodyInterface extends LoanBookModalInterface
{
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}