import { ResultInterface } from '../../Model/ResultModel';
import {SetUserCookie, DeleteUserCookie} from '../CookieController'

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

const handleSuccess = async(result: ResultInterface, stayLogin:boolean) =>
{
    if(result)
    {
        console.log(result.data)
        if(!stayLogin)
        {
            sessionStorage.setItem("authToken", result.data.authToken);
            sessionStorage.setItem("username", result.data.username);
            sessionStorage.setItem("role", result.data.role);
            sessionStorage.setItem("status", result.data.status);
            sessionStorage.setItem("avatarUrl", result.data.avatarUrl)
            return;
        }
        SetUserCookie(result.data.authToken, result.data.username, result.data.role , result.data.avatarUrl, result.data.status,30);
    }
}

export {handleLogout, handleSuccess}