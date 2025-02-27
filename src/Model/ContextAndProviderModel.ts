import { Dispatch, ReactNode, SetStateAction } from "react";
import { FindUserInterface, UserDataInterface } from "./TablePageModel";

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
    users: UserDataInterface[];
    filter: FindUserInterface | undefined;
    setFilter: Dispatch<SetStateAction<FindUserInterface | undefined>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    amount: number;
    setAmount: Dispatch<SetStateAction<number>>;
}

interface TabPanelProps extends ChildProps
{
    index: number;
    value: number;
}

export type {ChildProps, AlertConfig, AlertContextProps, ModalContextProps, ModalTemplateProps, UserContextProps, TabPanelProps}