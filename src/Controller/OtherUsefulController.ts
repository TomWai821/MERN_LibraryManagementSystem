import { ResultInterface } from '../Model/ResultModel';
import { SetUserCookie, DeleteUserCookie } from './CookieController'

const mainPage:string = 'http://localhost:3000/';

const handleLogout = async(username: string | null) =>
{
    if(document.cookie)
    {
        DeleteUserCookie(username);
    }
    sessionStorage.clear();
    window.location.href = mainPage;
}


// For Register/Login
const handleSuccess = async(result: ResultInterface, stayLogin:boolean) =>
{
    const userData = result.data;
    if(userData)
    {
        if(!stayLogin)
        {
            sessionStorage.setItem("authToken", userData.authToken as string);
            sessionStorage.setItem("username", userData.username);
            sessionStorage.setItem("role", userData.role);
            sessionStorage.setItem("status", userData.status);
            sessionStorage.setItem("avatarUrl", userData.avatarUrl as string)
            return;
        }
        SetUserCookie(userData.authToken  as string, userData.username, userData.role , userData.status, userData.avatarUrl as string, 30);
    }
}

// For user status detect in Action TableCell for Admin
const StatusDetectionForAllUser = (status: string) => 
{
    const isNormal = status === "Normal";

    return {
        delete: { disable: !isNormal },
        banned: { disable: !isNormal },
    }
}
    
export {handleLogout, handleSuccess, StatusDetectionForAllUser}