import { createContext, FC, useContext, useState } from "react";
import { FindUserInterface, UserDataInterface } from "../Model/TablePageModel";
import { ChildProps, UserContextProps } from "../Model/ContextAndProviderModel";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<ChildProps> = ({ children }) =>
{
    const [users, setUsers] = useState<UserDataInterface[]>([]);
    const [filter, setFilter] = useState<FindUserInterface>();

    return (
        <UserContext.Provider value={{ users, filter, setFilter }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => 
{
    const context = useContext(UserContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
