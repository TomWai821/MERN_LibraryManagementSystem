import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { FindUserInterface, UserDataInterface } from "../Model/TablePageModel";
import { ChildProps, UserContextProps } from "../Model/ContextAndProviderModel";
import { FetchUserData } from "../Controller/UserController/UserGetController";
import { GetResultInterface, UserResultDataInterface } from "../Model/ResultModel";
import { CalculateDueDate, GetCurrentDate, GetData } from "../Controller/OtherController";
import { ModifyStatusController, ModifyUserDataController } from "../Controller/UserController/UserPutController";
import { RegisterController } from "../Controller/UserController/UserPostController";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<ChildProps> = ({ children }) =>
{
    const [AllUser, setAllUser] = useState<UserResultDataInterface[]>([]);
    const [BannedUser, setBannedUser] = useState<UserResultDataInterface[]>([]);
    const [DeleteUser, setDeleteUser] = useState<UserResultDataInterface[]>([]);

    const [page, setPage] = useState<number>(0);
    const [amount, setAmount] = useState<number>(10);

    const authToken = GetData("authToken") as string;

    const fetchUser = useCallback(async (tableName: string, UserData: UserDataInterface | undefined) => 
    {
        const {username, email, role, status, gender} = UserData as FindUserInterface;
        try
        {
            const result : GetResultInterface | undefined = await FetchUserData(tableName, authToken, page, amount, username, email, role, status, gender);
            if(result && Array.isArray(result.foundUser))
            {
                setAllUser(result.foundUser);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken])

    const fetchAllUser = useCallback(async () => 
    {
        const resultForAllUser : GetResultInterface | undefined = await FetchUserData("AllUser", authToken, page, amount);
        const resultForBannedUser: GetResultInterface | undefined = await FetchUserData("BannedUser", authToken, page, amount);
        const resultForDeleteUser: GetResultInterface | undefined = await FetchUserData("DeleteUser", authToken, page, amount);

        try
        {
            if(resultForAllUser && Array.isArray(resultForAllUser.foundUser))
            {
                setAllUser(resultForAllUser.foundUser);
            }

            if(resultForBannedUser && Array.isArray(resultForBannedUser.foundUser))
            {
                setBannedUser(resultForBannedUser.foundUser);
            }

            if(resultForDeleteUser && Array.isArray(resultForDeleteUser.foundUser))
            {
                setDeleteUser(resultForDeleteUser.foundUser)
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken, page, amount])

    const createUser = useCallback(async (registerPosition:string, username:string, email:string, password:string, role:string, gender:string, birthDay:string) => 
    {
        const result = await RegisterController(registerPosition, username, email, password, role, gender, birthDay);
        try
        {
            if(result)
            {
                fetchAllUser();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[fetchAllUser, page, amount])

    const editUserData = useCallback(async (_id: string, username:string, email:string, gender:string, role:string) => 
    {
        const result : GetResultInterface | undefined = await ModifyUserDataController(_id, username, email, gender, role);

        try
        {
            if(result)
            {
                fetchAllUser();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[fetchAllUser])

    const changeUserstatus = useCallback(async (_id:string, status:string, duration:number, description:string) => 
    {
        const startDate = GetCurrentDate("Date") as Date;
        const dueDate = CalculateDueDate(duration);
        console.log(startDate);
        console.log(dueDate);
        const result : GetResultInterface | undefined = await ModifyStatusController(_id, status, startDate, dueDate, description);

        try
        {
            if(result)
            {
                fetchAllUser();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[fetchAllUser]);

    useEffect(() => 
        {
            fetchAllUser();
        }, [fetchAllUser, page, amount]
    )

    return (
        <UserContext.Provider value={{ setPage, setAmount, AllUser, BannedUser, DeleteUser, fetchUser, fetchAllUser, createUser, editUserData, changeUserstatus }}>
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
