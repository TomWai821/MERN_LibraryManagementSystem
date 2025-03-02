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

interface UserContextProps
{
    users: UserResultDataInterface[];
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    amount: number;
    setAmount: Dispatch<SetStateAction<number>>;
    fetchUser: (authToken:string, tableName:string, UserData: UserDataInterface | undefined, dateData: { startDate: Date; dueDate: Date; }) => Promise<void>;
    editUserData: (_id:string ,data: UserDataInterface) => void;
    changeUserstatus: (id:string, status:string, duration:number, description:string) => void;
}

interface TabPanelProps extends ChildProps
{
    index: number;
    value: number;
}

export type {ChildProps, AlertConfig, AlertContextProps, ModalContextProps, ModalTemplateProps, UserContextProps, TabPanelProps}