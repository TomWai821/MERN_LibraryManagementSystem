import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { FindUserInterface, UserDataInterface } from "../../Model/TablePageModel";
import { ChildProps, DeleteUserContextProps } from "../../Model/ContextAndProviderModel";
import { FetchUserData } from "../../Controller/UserController/UserGetController";
import { GetResultInterface, UserResultDataInterface } from "../../Model/ResultModel";
import { GetData } from "../../Controller/OtherController";
import { ModifyStatusController } from "../../Controller/UserController/UserPutController";
import { DeleteUserController } from "../../Controller/UserController/UserDeleteController";

const DeleteUserContext = createContext<DeleteUserContextProps | undefined>(undefined);

export const DeleteUserProvider: FC<ChildProps> = ({ children }) =>
{
    const [DeleteUser, setDeleteUser] = useState<UserResultDataInterface[]>([]);

    const authToken = GetData("authToken") as string;

    // For search function
    const fetchDeleteUser = useCallback(async (UserData: UserDataInterface | undefined) => 
    {
        const {username, email, role, status, gender} = UserData as FindUserInterface;
        try
        {
            const result : GetResultInterface | undefined = await FetchUserData("DeleteUser", authToken, username, email, role, status, gender);
            if(result && Array.isArray(result.foundUser))
            {
                setDeleteUser(result.foundUser);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken])

    // For table init
    const fetchAllDeleteUser = useCallback(async () => 
    {
        const resultForDeleteUser: GetResultInterface | undefined = await FetchUserData("DeleteUser", authToken);

        try
        {
            if(resultForDeleteUser && Array.isArray(resultForDeleteUser.foundUser))
            {
                setDeleteUser(resultForDeleteUser.foundUser)
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken])

    const changeDeleteUserStatus = useCallback(async (_id:string, status:string) => 
    {
        const result : GetResultInterface | undefined = await ModifyStatusController(authToken, _id, status);

        try
        {
            if(result)
            {
                fetchAllDeleteUser();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[fetchAllDeleteUser]);

    const actualDeleteUser = useCallback(async(_id:string) => 
        {
            const result : GetResultInterface | undefined = await DeleteUserController(authToken, _id);

            try
            {
                if(result)
                {
                    fetchAllDeleteUser();
                }
            }
            catch(error)
            {
                console.log(error);
            }
        },[fetchAllDeleteUser]
    )

    useEffect(() => 
        {
            fetchAllDeleteUser();
        }, [fetchAllDeleteUser]
    )

    return (
        <DeleteUserContext.Provider value={{ DeleteUser, fetchAllDeleteUser, fetchDeleteUser,  changeDeleteUserStatus, actualDeleteUser }}>
            {children}
        </DeleteUserContext.Provider>
    );
};

export const useDeleteUserContext = () => 
{
    const context = useContext(DeleteUserContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
