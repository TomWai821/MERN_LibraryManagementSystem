import { ReactNode } from "react";
import { BookDataInterface, ContactInterface, DefinitionState, LoanBookInterface, UserResultDataInterface } from "./ResultModel";
import { UserDataInterface } from "./UserTableModel";
import { BookTableDataInterface } from "./BookTableModel";
import { IsAdminInterface } from "./TablePagesAndModalModel";

export interface ChildProps
{
    children: ReactNode;
}

// For Alert
export interface AlertConfig
{
    AlertType: 'success' | 'info' | 'warning' | 'error';
    Message: string;
    open: boolean;
    onClose?: () => void;
}

export interface AlertContextProps
{
    setAlertConfig: (config: AlertConfig | null) => void;
}

// For modal
export interface ModalContextProps
{
    open: boolean;
    handleOpen: (content: ReactNode) => void;
    handleClose: () => void
    content: ReactNode;
}

export interface ModalTemplateProps extends ChildProps
{
    title: string;
    minWidth?: string;
    maxWidth?: string;
    width?:string;
    cancelButtonName: string;
    cancelButtonEvent?: () => void;
}

// For Context
export interface UserContextProps
{
    userData: UserResultDataInterface[][];
    fetchAllUser: () => Promise<void>;
    fetchUser: (type:string, UserData: UserDataInterface | undefined) => Promise<void>;
    createUser: (registerPosition:string, username:string, email:string, password:string, role:string, gender:string, birthDay:string) => void;
    editUserData: (userId:string, username: string, email: string, gender: string, role: string) => void;
    editSuspendUserData: (userId:string, bannedListID: string, dueDate: Date, description: string) => void;
    changeUserStatus: (type:string, userId:string, status:string, ListID?:string, duration?:number, description?:string) => void;
    actualDeleteUser: (userId:string, deleteListID:string, status:string) => void;
}

export interface BookContextProps
{
    bookData:(BookDataInterface[] | LoanBookInterface[])[];
    suggestBook: (BookDataInterface[] | LoanBookInterface[])[];
    SelfLoanBook: LoanBookInterface[];
    fetchAllBook: () => Promise<void>;
    fetchAllBookWithFliterData: (bookname?:string, genreID?:string, languageID?:string, authorID?:string, publisherID?:string) => Promise<void>;
    fetchLoanBookWithFliterData: (type:string, bookname?:string, username?:string, status?:string) => Promise<void>;
    createBook: (image:File, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description:string, publishDate:string) => void;
    editBook: (bookID:string, imageName:string, newFile:File, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description:string) => void;
    loanBook: (bookID:string, userID?:string) => void;
    returnBook: (loanRecordID:string) => void;
    deleteBook: (bookID:string) => void;
}

export interface SuggestBookContextProps
{
    
}

export interface DefinatonProps
{
    definition: DefinitionState;
    fetchAllDefinition: () => Promise<void>;
    createDefinition:(type:string, shortName:string, detailsName:string) => void;
    editDefinition:(type:string, id:string, shortName:string, detailsName:string) => void;
    deleteDefinition:(type:string, id:string) => void;
}

export interface ContactProps
{
    contact: ContactState;
    fetchAllContactData: () => Promise<void>;
    fetchContactDataWithFilterData: (type:string, author:string, publisher:string) => Promise<void>;
    createContactData:(type:string, contactName:string, phoneNumber:string, email:string, address?:string) => void;
    editContactData:(type:string, id:string, contactName:string, phoneNumber:string, email:string, address?:string) => void;
    deleteContactData:(type:string, id:string) => void;
}

// For Tab Panel
export interface TabPanelProps extends ChildProps
{
    index: number;
    value: number;
}

// For ContentTableCell
export interface ContentTableCellProps extends ChildProps, IsAdminInterface
{
    TableName: string;
    value: number;
    isLoggedIn?: boolean;
    Information: UserResultDataInterface | BookDataInterface | BookTableDataInterface | LoanBookInterface | ContactInterface;
}

export interface SuggestionData 
{
    topGenres: string[];
    topAuthors: string[];
    topPublishers: string[];
}

export interface ContactState
{
    Author: ContactInterface[];
    Publisher: ContactInterface[];
}
