import { createContext, FC, useContext, useEffect, useState } from "react";
import { FindUserInterface, UserDataInterface } from "../Model/TablePageModel";
import { ChildProps, UserContextProps } from "../Model/ContextAndProviderModel";
import { FetchUserData } from "../Controller/UserController/UserGetController";
import { GetResultInterface } from "../Model/ResultModel";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<ChildProps> = ({ children }) =>
{
    const [users, setUsers] = useState<UserDataInterface[]>([]);
    const [filter, setFilter] = useState<FindUserInterface>();
    const [page, setPage] = useState<number>(1);
    const [amount, setAmount] = useState<number>(10);

    const fetchUser = async () => 
    {
        try
        {
            const result : GetResultInterface | undefined = await FetchUserData(undefined, page, amount, filter?.username, filter?.email, filter?.role, filter?.status, filter?.gender, filter?.startDate, filter?.dueDate);
            if(result && Array.isArray(result.foundUser))
            {
                setUsers(result.foundUser);
            }

        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(() => 
    {
        fetchUser()
    },[])

    return (
        <UserContext.Provider value={{ users, filter, setFilter, page, setPage, amount, setAmount }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => 
{
    const context = useContext(UserContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
