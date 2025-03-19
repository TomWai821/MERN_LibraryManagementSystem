import { ReactNode } from "react";
import { BookResultDataInterface, DefinationState, UserResultDataInterface } from "./ResultModel";
import { UserDataInterface } from "./UserTableModel";
import { BookDataInterface } from "./BookTableModel";

interface ChildProps
{
    children: ReactNode;
}

// For Alert
interface AlertConfig
{
    AlertType: 'success' | 'info' | 'warning' | 'error';
    Message: string;
    open: boolean;
    onClose?: () => void;
}

interface AlertContextProps
{
    setAlertConfig: (config: AlertConfig | null) => void;
}

// For modal
interface ModalContextProps
{
    open: boolean;
    handleOpen: (content: ReactNode) => void;
    handleClose: () => void
    content: ReactNode;
}

interface ModalTemplateProps extends ChildProps
{
    title: string;
    cancelButtonName: string;
    cancelButtonEvent?: () => void;
}

// For Context
interface UserContextProps
{
    AllUser: UserResultDataInterface[];
    BannedUser: UserResultDataInterface[];
    DeleteUser: UserResultDataInterface[];
    fetchAllUser: () => Promise<void>;
    fetchUser: (type:string, UserData: UserDataInterface | undefined) => Promise<void>;
    createUser: (registerPosition:string, username:string, email:string, password:string, role:string, gender:string, birthDay:string) => void;
    editUserData: (userId:string, username: string, email: string, gender: string, role: string) => void;
    editBannedUserData: (userId:string, bannedListID: string, dueDate: Date, description: string) => void;
    changeUserStatus: (type:string, userId:string, status:string, ListID?:string, duration?:number, description?:string) => void;
    actualDeleteUser: (userId:string, deleteListID:string, status:string) => void;
}

interface BookContextProps
{
    AllBook: BookResultDataInterface[];
    LoanBook: BookResultDataInterface[];
    OnShelfBook: BookResultDataInterface[];
    fetchAllBook: () => Promise<void>;
    createBook: (bookname:string, genreID:string, languageID:string, page:number, description:string) => void;
}

interface DefinatonProps
{
    defination: DefinationState;
    fetchAllDefination: () => Promise<void>;
    createDefination:(type:string, shortName:string, detailsName:string) => void;
    editDefination:(type:string, id:string, shortName:string, detailsName:string) => void;
    deleteDefination:(type:string, id:string) => void;
}

// For Tab Panel
interface TabPanelProps extends ChildProps
{
    index: number;
    value: number;
}

// For ContentTableCell
interface ContentTableCellProps extends ChildProps
{
    TableName: string;
    value: number;
    isAdmin: boolean;
    Information: UserResultDataInterface | BookResultDataInterface | BookDataInterface;
}

export type {ChildProps, AlertConfig, AlertContextProps, ModalContextProps, ModalTemplateProps, UserContextProps, BookContextProps, TabPanelProps, ContentTableCellProps, DefinatonProps}