import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";

// Another Useful Function
import { FetchUserData } from "../../Controller/UserController/UserGetController";
import { CalculateDueDate, GetCurrentDate, GetData } from "../../Controller/OtherController";
import { ModifyBanListDataController, ModifyStatusController, ModifyUserDataController } from "../../Controller/UserController/UserPutController";
import { RegisterController } from "../../Controller/UserController/UserPostController";

// Models
import { GetResultInterface, UserResultDataInterface } from "../../Model/ResultModel";
import { FindUserInterface, UserDataInterface } from "../../Model/UserTableModel";
import { ChildProps, UserContextProps } from "../../Model/ContextAndProviderModel";
import { DeleteUserController } from "../../Controller/UserController/UserDeleteController";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<ChildProps> = ({ children }) =>
{
    const [AllUser, setAllUser] = useState<UserResultDataInterface[]>([]);
    const [BannedUser, setBannedUser] = useState<UserResultDataInterface[]>([]);
    const [DeleteUser, setDeleteUser] = useState<UserResultDataInterface[]>([]);
    const authToken = GetData("authToken") as string;
    const userData = [AllUser, BannedUser, DeleteUser];

    // For init
    const fetchAllUser = useCallback(async () => 
    {
        try
        {
            const resultForAllUser: GetResultInterface | undefined = await FetchUserData("AllUser", authToken);
            const resultForBannedUser: GetResultInterface | undefined = await FetchUserData("BannedUser", authToken);
            const resultForDeleteUser: GetResultInterface | undefined = await FetchUserData("DeleteUser", authToken);

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
                setDeleteUser(resultForDeleteUser.foundUser);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken])

    // For search function
    const fetchUser = useCallback(async (type:string, UserData: UserDataInterface | undefined) => 
    {
        const {username, email, role, status, gender} = UserData as FindUserInterface;
        try
        {
            const result : GetResultInterface | undefined = await FetchUserData(type, authToken, username, email, role, status, gender);

            if(result && Array.isArray(result.foundUser))
            {
                switch(type)
                {
                    case "AllUser":
                        setAllUser(result.foundUser);
                        break;

                    case "BannedUser":
                        setBannedUser(result.foundUser);
                        break;

                    case "DeleteUser":
                        setDeleteUser(result.foundUser);
                        break;
                }
                
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
    
    const editBannedUserData = useCallback(async (userId:string, bannedListID:string, dueDate:Date, description:string) => 
    {
        const result : GetResultInterface | undefined = await ModifyBanListDataController(authToken, userId, bannedListID, dueDate, description);

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

    const changeUserStatus = useCallback(async (type:string, userId:string, status:string, ListID?:string, duration?:number, description?:string) => 
    {
        const startDate = GetCurrentDate("Date") as Date;
        const dueDate = CalculateDueDate(duration as number);
        let result : GetResultInterface | undefined;
        try
        {
            switch(type)
            {
                case "UnBanned":
                    result = await ModifyStatusController(type, authToken, userId, status, ListID);
                    break;
                
                case "UnDelete":
                    result = await ModifyStatusController(type, authToken, userId, status, ListID);
                    break;

                default:
                    if(type !== "Banned" && type !== "Delete")
                    {
                        return console.log(`Invalid type: ${type}`);
                    }
                    result = await ModifyStatusController(type, authToken, userId, status, undefined, startDate, dueDate, description);
                    break;
            }
    
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

    const actualDeleteUser = useCallback(async(userId:string, banListID:string) => 
    {
        const result : GetResultInterface | undefined = await DeleteUserController(authToken, userId, banListID);
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
        <UserContext.Provider value={{ userData, fetchAllUser, fetchUser, createUser, editUserData, editBannedUserData, changeUserStatus, actualDeleteUser }}>
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
