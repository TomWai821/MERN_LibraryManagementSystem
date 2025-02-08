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
        if(!stayLogin)
        {
            sessionStorage.setItem("authToken", result.authToken);
            sessionStorage.setItem("username", result.name);
            sessionStorage.setItem("role", result.role);
            return;
        }
        SetUserCookie(result.authToken, result.name, result.role , 30);
    }
}

export {handleLogout, handleSuccess}