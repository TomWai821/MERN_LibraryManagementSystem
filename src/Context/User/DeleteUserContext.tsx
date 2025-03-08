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

    const actualDeleteUser = useCallback(async(userId:string, banListID:string ,status:string) => 
        {
            const result : GetResultInterface | undefined = await DeleteUserController(authToken, userId, banListID, status);

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
        }, []
    )

    return (
        <DeleteUserContext.Provider value={{ DeleteUser, fetchAllDeleteUser, fetchDeleteUser, actualDeleteUser }}>
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
