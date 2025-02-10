import { createContext, FC, ReactNode, useContext, useState } from "react";
import { ModalContextProps, ProviderProps } from "../Model/ContextAndProviderModel";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);
    
const ModalProvider:FC<ProviderProps> = ({children}) => 
{
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<React.ReactNode>(null);

    const handleOpen = (newContext: ReactNode) => 
    {
        console.log(newContext);
        setContent(newContext);
        setOpen(true);
    }
    
    const handleClose = () => 
    {
        setOpen(false);
        setContent(null);
    }

    return(
        <ModalContext.Provider value={{ open, handleOpen, handleClose, content }}>
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