import { createContext, FC, useContext, useState } from "react";
import { ModalContextProps, ProviderProps } from "../Model/ContextAndProviderModel";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const ModalProvider:FC<ProviderProps> = ({children}) => 
{
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <ModalContext.Provider value={{ open, handleOpen, handleClose }}>
            {children}
        </ModalContext.Provider>
    );
}

const useModal = () => 
{
    const context = useContext(ModalContext);
    if (!context) 
    {
      throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export { ModalProvider, useModal }