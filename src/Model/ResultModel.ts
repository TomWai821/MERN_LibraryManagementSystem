import { UserDataInterface } from "./UserTableModel";

export interface ResultInterface
{
    data: RegisterDataInterface;
}

export interface RegisterDataInterface
{
    authToken: string;
    username: string;
    role: string;
    avatarUrl:string;
    status: string;
}

export interface GetResultInterface
{
    success:boolean;
    authtoken?:string;
    foundUser?: UserResultDataInterface | UserResultDataInterface[];
    foundBook?: BookDataInterface | BookDataInterface[];
    foundDefinition?: DefinitionInterface | DefinitionInterface[];
    foundContact?: ContactInterface | ContactInterface[];
    foundLoanBook?: LoanBookInterface | LoanBookInterface[];
    foundFavouriteBook?: BookDataInterface | BookDataInterface[];
}

export interface UserResultDataInterface extends UserDataInterface
{
    _id:string;
    avatarUrl?:string;
    bannedDetails?: DetailsInterfaceForSuspendAndDelete;
    deleteDetails?: DetailsInterfaceForSuspendAndDelete;
}

export interface BookDataInterface
{
    _id:string;
    image?: ImageInterface;
    bookname:string;
    genreID:string;
    genre?:string;
    language?:string;
    languageID:string;
    author?:string;
    authorID:string;
    publisher?:string;
    publisherID:string;
    status:string;
    description: string;
    genreDetails: DefinitionInterface;
    languageDetails: DefinitionInterface;
    authorDetails: ContactInterface;
    publisherDetails: ContactInterface;
    publishDate: Date | string;
}

export interface BookDataInterfaceForEdit
{
    _id:string;
    bookname:string;
    genre?:string;
    language?:string;
    author?:string;
    publisher?:string;
    description: string;
    status:string;
    filename:string;
    imageUrl:string;
    image?:File;
}

export interface ImageInterface
{
    url?:string;
    filename?:string;
}

export interface DetailsInterfaceForSuspendAndDelete
{
    _id:string;
    userID:string;
    description:string;
    startDate: Date | string;
    dueDate: Date | string;
    status:string;
}

export interface DefinitionResultInterface
{
    success:boolean;
    foundData: DefinitionInterface | DefinitionInterface[];
}

export interface DefinitionInterface
{
    _id:string;
    shortName:string;
    language?:string;
    genre?:string;
}

export interface DefinitionState
{
    Genre: DefinitionInterface[];
    Language: DefinitionInterface[];
}

export interface ContactInterface
{
    _id:string;
    publisher?:string;
    author?:string;
    address?:string;
    email:string;
    phoneNumber:string;
}

export interface LoanBookInterface
{
    _id:string;
    userDetails?: UserDataInterface;
    bookDetails?: BookDataInterface;
    authorDetails?: any;
    languageDetails?:any;
    publisherDetails?:any;
    genreDetails?:any;
    loanDate?:string | Date;
    dueDate?:string | Date;
    status:string;
    count?:string;
}