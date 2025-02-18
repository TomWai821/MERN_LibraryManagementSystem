import { ReactNode } from "react";

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



interface TabPanelProps extends ChildProps
{
    index: number;
    value: number;
}

export type {ChildProps, AlertConfig, AlertContextProps, ModalContextProps, ModalTemplateProps, TabPanelProps}