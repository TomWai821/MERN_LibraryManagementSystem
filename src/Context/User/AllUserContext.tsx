import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";

// Another Useful Function
import { FetchUserData } from "../../Controller/UserController/UserGetController";
import { CalculateDueDate, GetCurrentDate, GetData } from "../../Controller/OtherController";
import { ModifyStatusController, ModifyUserDataController } from "../../Controller/UserController/UserPutController";
import { RegisterController } from "../../Controller/UserController/UserPostController";

// Models
import { GetResultInterface, UserResultDataInterface } from "../../Model/ResultModel";
import { FindUserInterface, UserDataInterface } from "../../Model/UserTableModel";
import { ChildProps, AllUserContextProps } from "../../Model/ContextAndProviderModel";

const AllUserContext = createContext<AllUserContextProps | undefined>(undefined);

export const AllUserProvider: FC<ChildProps> = ({ children }) =>
{
    const [AllUser, setAllUser] = useState<UserResultDataInterface[]>([]);
    const authToken = GetData("authToken") as string;

    // For init
    const fetchAllUser = useCallback(async () => 
    {
        const response: GetResultInterface | undefined = await FetchUserData("AllUser", authToken);

        try
        {
            if(response && Array.isArray(response.foundUser))
            {
                setAllUser(response.foundUser);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken])

    // For search function
    const fetchUser = useCallback(async (UserData: UserDataInterface | undefined) => 
    {
        const {username, email, role, status, gender} = UserData as FindUserInterface;
        try
        {
            const result : GetResultInterface | undefined = await FetchUserData("AllUser", authToken, username, email, role, status, gender);

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
    },[fetchAllUser])

    const editUserData = useCallback(async (userId: string, username:string, email:string, gender:string, role:string) => 
    {
        const result : GetResultInterface | undefined = await ModifyUserDataController(authToken, userId, username, email, gender, role);

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

    const changeUserStatus = useCallback(async (userId:string, status:string, duration:number, description?:string) => 
    {
        const startDate = GetCurrentDate("Date") as Date;
        const dueDate = CalculateDueDate(duration);
        const result : GetResultInterface | undefined = await ModifyStatusController(authToken, userId, status, undefined, undefined, undefined, startDate, dueDate, description);

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
        }, [fetchAllUser]
    )

    return (
        <AllUserContext.Provider value={{ AllUser, fetchAllUser, fetchUser, createUser, editUserData, changeUserStatus }}>
            {children}
        </AllUserContext.Provider>
    );
};

export const useAllUserContext = () => 
{
    const context = useContext(AllUserContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
