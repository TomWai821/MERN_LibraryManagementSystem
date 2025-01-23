import { setUserCookie, deleteUserCookie } from "../CookieController";
import { resultInterface, getResultInterface } from "../../Model/ResultModel"

const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';
const mainPage:string = 'http://localhost:3000/';


export const LoginController =  async (email:String, password:String, time:number): Promise<any> => 
{
    const user = {email, password};

    try
    {
        /*
            const response = new XMLHttpRequest();
            response.open('POST', `${localhost}/login`);
            response.setRequestHeader('content-type', contentType);
            response.send(JSON.stringify(user));
            
            response.onload = () => 
            {
                if(response.status === 200)
                {
                    const result: resultInterface = JSON.parse(response.response);
                    handleSuccess(result);
                    return true;
                }
                else
                {
                    return false;
                }
            }
        */
        const response = await fetch(`${localhost}/login`, 
            {
                method: 'POST',
                headers: { 'content-type': contentType },
                body: JSON.stringify(user)
            }
        );

        if(response.ok)
        {
            const result: resultInterface = await response.json();
            handleSuccess(result, 30);
            return true;
        }
        else
        {
            return false;
        }
    }
    catch(error)
    {
        console.log("");
        return false;
    }
}

export const RegisterController = async (email:string, username:string, password:string, birthDay:string, gender:string): Promise<any> => 
{
    const user = {email, username, password, birthDay, gender};

    try
    {
        const response = await fetch(`${localhost}/register`,
            {
                method: 'POST',
                headers: { 'content-type': contentType },
                body: JSON.stringify(user)
            }
        )

        if(response.ok)
        {
            const result: resultInterface = await response.json();
            handleSuccess(result, 30);
            return true;
        }
        else
        {
            return false;
        }
        
    }
    catch(error)
    {
        console.log("");
        return false;
    }
}

export const ChangeDataController = async() => 
{

}

export const fetchUserData = async(authToken:string) => 
{
    try
    {
        const response = await fetch(`${localhost}/userData`,
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

export const handleLogout = async(username: string | null) =>
{
    deleteUserCookie(username);
    window.location.href = mainPage;
}

export const handleSuccess = async(result: resultInterface, time:number) =>
{
    if(result)
    {
        setUserCookie(result.authToken, result.name, result.role , time);
    }
}
    