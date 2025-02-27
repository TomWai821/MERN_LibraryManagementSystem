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
            return;
        }
        SetUserCookie(result.data.authToken, result.data.username, result.data.role , 30);
    }
}

export {handleLogout, handleSuccess}