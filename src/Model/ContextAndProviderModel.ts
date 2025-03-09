import { Dispatch, ReactNode, SetStateAction } from "react";
import { FindUserInterface, UserDataInterface } from "./TablePageModel";
import { UserResultDataInterface } from "./ResultModel";

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

interface AllUserContextProps
{
    AllUser: UserResultDataInterface[];
    fetchAllUser: () => Promise<void>;
    fetchUser: (UserData: UserDataInterface | undefined) => Promise<void>;
    createUser: (registerPosition:string, username:string, email:string, password:string, role:string, gender:string, birthDay:string) => void;
    editUserData: (userId:string, username: string, email: string, gender: string, role: string) => void;
    changeUserStatus: (userId:string, status:string, duration:number, description?:string) => void;
}

interface BannedUserContextProps
{
    BannedUser: UserResultDataInterface[];
    fetchAllBannedUser: () => Promise<void>;
    fetchBannedUser: (UserData: UserDataInterface | undefined, dateData: { startDate: Date; dueDate: Date; }) => Promise<void>;
    //editBannedUserData: (userId:string, duration:string, description?:string) => void;
    changeBannedUserStatus: (userId:string, bannedListID:string) => void;
}

interface DeleteUserContextProps
{
    DeleteUser: UserResultDataInterface[];
    fetchAllDeleteUser: () => Promise<void>;
    fetchDeleteUser: (UserData: UserDataInterface | undefined, dateData: { startDate: Date; dueDate: Date; }) => Promise<void>;
    changeDeleteUserStatus: (userId:string, deleteListID:string, status:string) => void;
    actualDeleteUser: (userId:string, deleteListID:string, status:string) => void;
}

interface TabPanelProps extends ChildProps
{
    index: number;
    value: number;
}

export type {ChildProps, AlertConfig, AlertContextProps, ModalContextProps, ModalTemplateProps, AllUserContextProps, BannedUserContextProps, DeleteUserContextProps, TabPanelProps}