import { createContext, FC, useContext } from "react";
import { ChildProps, AuthContextProps } from "../../Model/ContextAndProviderModel";
import { GetUserCookie } from "../../Controller/CookieController";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<ChildProps> = ({ children }) =>
{
    const mainPage:string = process.env.REACT_APP_MAIN_PAGE as string;

    const IsLoggedIn = () => 
    {
        const tokenFromCookie = document.cookie.split(';').find(row => row.startsWith('authToken='));
    
        if (tokenFromCookie || sessionStorage.getItem('authToken')) 
        {
            return true;
        }
        return false;
    }
    
    const GetData = (data:string): string | undefined | null => 
    {
        const DataList = ["authToken", "role", "username", "avatarUrl", "status"];
    
        if(DataList.includes(data))
        {
            return GetUserCookie(data) || sessionStorage.getItem(data);
        }
    
        return undefined;
    }
    
    const IsAdmin = (): boolean => 
    {
        return GetData("role") === "Admin";
    }

    const handleLogout = async(username: string | null) =>
    {
        if(document.cookie)
        {
            document.cookie = "authToken=" + username + '; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
        sessionStorage.clear();
        window.location.href = mainPage;
    }
    
    return(
        <AuthContext.Provider value={{IsLoggedIn, GetData, IsAdmin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => 
{
    const context = useContext(AuthContext);
        
    if (context === undefined) 
    {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
}