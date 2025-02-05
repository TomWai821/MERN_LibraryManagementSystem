import { ReactNode } from "react";

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

export interface AlertProviderProps
{
    children: ReactNode;
}