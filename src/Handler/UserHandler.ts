import { setUserCookie, deleteUserCookie } from "./CookieHandler";
import { resultInterface, getResultInterface } from "../Interface/resultInterface";

const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';
const mainPage:string = 'http://localhost:3000/';


export const LoginHandler = async (email:String, password:String) => 
{
    const user = {email, password};

    try
    {
        const request = new XMLHttpRequest();
        request.open('POST', `${localhost}/login`);
        request.setRequestHeader('content-type', contentType);
        request.send(JSON.stringify(user));
        
        request.onload = () => 
        {
            if(request.status === 200)
            {
                const result: resultInterface = JSON.parse(request.response);
                handleSuccess(result);
            }
        }
    }
    catch(error)
    {
        console.log("");
    }
}

export const RegisterHandler = async (email:string, name:string, password:string, birthDay:string, gender:string) => 
{
    const user = {email, name, password, birthDay, gender};

    try
    {
        const response = await fetch(`${localhost}/register`,
            {
                method: 'POST',
                headers: { 'content-type': contentType },
                body: JSON.stringify(user)
            }
        )

        const result: resultInterface = await response.json();

        handleSuccess(result);
    }
    catch(error)
    {
        console.log("");
    }
}

export const fetchUserData = async(authToken:string) => 
{
    try
    {
        const response = await fetch(`${localhost}/user`,
            {
                method: 'GET',
                headers: 
                { 
                    'content-type': contentType,
                    'authToken': authToken
                },
            }
        )
        const result: getResultInterface = await response.json();
        return result;
    }
    catch(error)
    {
        console.log("");
    }
}

export const handleLogout = async() =>
{
    deleteUserCookie();
    window.location.href = mainPage;
}

export const handleSuccess = async(result: resultInterface) =>
{
    if(result)
    {
        setUserCookie(result.authToken, result.name, 30);
        window.location.href = mainPage;
    }
}
    