import { createContext, FC, useContext, useEffect, useState } from "react";
import { FindUserInterface, UserDataInterface } from "../Model/TablePageModel";
import { ChildProps, UserContextProps } from "../Model/ContextAndProviderModel";
import { FetchUserData } from "../Controller/UserController/UserGetController";
import { GetResultInterface, UserResultDataInterface } from "../Model/ResultModel";
import { GetData } from "../Controller/OtherController";
import { UserDataTableName } from "../Maps/TableMaps";
import { ModifyDataController } from "../Controller/UserController/UserPutController";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<ChildProps> = ({ children }) =>
{
    const [users, setUsers] = useState<UserResultDataInterface[]>([]);

    const [page, setPage] = useState<number>(0);
    const [amount, setAmount] = useState<number>(10);

    const fetchUser = async (authToken:string, tableName:string, UserData: UserDataInterface | undefined) => 
    {
        const {username, email, role, status, gender} = UserData as FindUserInterface;
        try
        {
            const result : GetResultInterface | undefined = await FetchUserData(tableName, authToken, page, amount, username, email, role, status, gender);
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

    const fetchAllUser = async (page: number) => 
    {
        const tableName = UserDataTableName[page];
        const authToken = GetData("authToken") as string;
        const result : GetResultInterface | undefined = await FetchUserData(tableName, authToken, page, amount);
        try
        {
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

    const editUserData = async (_id: string, data:UserDataInterface) => 
    {
        console.log(data);
        const result : GetResultInterface | undefined = await ModifyDataController(_id, data);

        try
        {
            if(result)
            {
                fetchAllUser(page);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(() => 
    {
        fetchAllUser(page);
    },[page, amount])

    return (
        <UserContext.Provider value={{ users, page, setPage, amount, setAmount, fetchUser, editUserData }}>
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
