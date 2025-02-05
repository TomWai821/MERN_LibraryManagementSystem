import React, { createContext, useState, ReactNode, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertConfig, AlertContextProps, AlertProviderProps } from '../Model/AlertModel';

// Create the AlertContext with default values
const AlertContext = createContext<AlertContextProps | undefined>(undefined);

const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => 
{
    const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
    const Duration = 3000;

    const handleClose = () => 
    {
        if (alertConfig) 
        {
            setAlertConfig({ ...alertConfig, open: false });
        }
    };

    return (
        <AlertContext.Provider value={{ setAlertConfig }}>
            {children}
            {alertConfig && (
                <Snackbar 
                    open={alertConfig.open} 
                    autoHideDuration={Duration} 
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={alertConfig.AlertType}>
                        {alertConfig.Message}
                    </Alert>
                </Snackbar>
            )}
        </AlertContext.Provider>
    );
};

export { AlertProvider, AlertContext };
