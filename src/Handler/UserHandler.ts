import { setUserCookie, deleteUserCookie } from "./CookieHandler";


const contentType:string = 'application/json';

interface result
{
    authToken: string,
    name: string
}

export const LoginHandler = async (email:String, password:String) => 
{
    const user = {email, password};

    try
    {
        const request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:5000/api/user/login', true);
        request.setRequestHeader('content-type', contentType);
        request.send(JSON.stringify(user));
        
        request.onload = () => 
        {
            if(request.status === 200)
            {
                const result: result = JSON.parse(request.response);
                console.log(result);
                handleSuccess(result);
            }
        }
    }
    catch(error)
    {
        console.log("");
    }
}

export const RegisterHandler = async (email:string, name:string, password:string, gender:string, birthDay:string) => 
{
    const user = {email, name, password, gender, birthDay};

    try
    {
        const response = await fetch('http://localhost:5000/api/user/register',
            {
                method: 'POST',
                headers: { 'content-type': contentType },
                body: JSON.stringify(user)
            }
        )

        const result: result = await response.json();
        console.log(result);

        handleSuccess(result);
    }
    catch(error)
    {
        console.log("");
    }
}

/*
export const fetchUserData = async(authToken:string) => 
{
    try
    {
        const response = await fetch('',
            {
                method: 'GET',
                headers: { 'content-type': contentType},
                body: JSON.stringify();
            }
        )

        const result: result = await response.json();
        console.log(result);

        handleSuccess(result);
    }
    catch(error)
    {
        console.log("");
    }
}
*/

export const handleLogout = async() =>
{
    deleteUserCookie();
    window.location.href = 'http://localhost:3000/';
}

export const handleSuccess = async(result: result) =>
{
    if(result)
    {
        setUserCookie(result.authToken, result.name, 30);
        window.location.href = 'http://localhost:3000/';
    }
}
    