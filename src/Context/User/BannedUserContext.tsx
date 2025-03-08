import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { FindUserInterface, UserDataInterface } from "../../Model/TablePageModel";
import { ChildProps, BannedUserContextProps } from "../../Model/ContextAndProviderModel";
import { FetchUserData } from "../../Controller/UserController/UserGetController";
import { GetResultInterface, UserResultDataInterface } from "../../Model/ResultModel";
import { CalculateDueDate, GetCurrentDate, GetData } from "../../Controller/OtherController";
import { ModifyStatusController, ModifyUserDataController } from "../../Controller/UserController/UserPutController";

const BannedUserContext = createContext<BannedUserContextProps | undefined>(undefined);

export const BannedUserProvider: FC<ChildProps> = ({ children }) =>
{
    const [BannedUser, setBannedUser] = useState<UserResultDataInterface[]>([]);

    const authToken = GetData("authToken") as string;

    // For search function
    const fetchBannedUser = useCallback(async (UserData: UserDataInterface | undefined) => 
    {
        const {username, email, role, status, gender} = UserData as FindUserInterface;
        try
        {
            const result : GetResultInterface | undefined = await FetchUserData("BannedUser", authToken, username, email, role, status, gender);
            if(result && Array.isArray(result.foundUser))
            {
                setBannedUser(result.foundUser);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken])

    // For table init
    const fetchAllBannedUser = useCallback(async () => 
    {
        const resultForDeleteUser: GetResultInterface | undefined = await FetchUserData("BannedUser", authToken);

        try
        {
            if(resultForDeleteUser && Array.isArray(resultForDeleteUser.foundUser))
            {
                setBannedUser(resultForDeleteUser.foundUser)
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken])

    /*
    const editUserData = useCallback(async (userId: string, bannedListID:string, duration:string, description:string) => 
    {
        const result : GetResultInterface | undefined = await ModifyUserDataController(authToken, userId, undefined, undefined);

        try
        {
            if(result)
            {
                fetchAllBannedUser();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[fetchAllUser])
    */

    const changeBannedUserStatus = useCallback(async (userId:string, bannedListID:string, status:string) => 
    {
        const result : GetResultInterface | undefined = await ModifyStatusController(authToken, userId, status, bannedListID);

        try
        {
            if(result)
            {
                fetchAllBannedUser();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[fetchAllBannedUser]);

    useEffect(() => 
        {
            fetchAllBannedUser();
        }, [fetchAllBannedUser]
    )

    return (
        <BannedUserContext.Provider value={{ BannedUser, fetchAllBannedUser, fetchBannedUser, changeBannedUserStatus }}>
            {children}
        </BannedUserContext.Provider>
    );
};

export const useBannedUserContext = () => 
{
    const context = useContext(BannedUserContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
