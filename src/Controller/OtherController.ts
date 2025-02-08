import { GetUserCookie } from "./CookieController";

const ChangePage = (location: string) => 
{
    window.location.href = location;
}

const IsLoggedIn = () => 
{
    const tokenFromCookie = document.cookie.split(';').find(row => row.startsWith('authToken='));

    if (tokenFromCookie || sessionStorage.getItem('authToken')) 
    {
        return true;
    }
    return false;
}

const GetRole = (): string | undefined => 
{
    return GetUserCookie("role") || sessionStorage.getItem("role") || undefined;
}

const GetUsername = (): string | null =>
{
    return GetUserCookie("username") || sessionStorage.getItem("username");
};

const GetCurrentDate = (): string => 
{ 
    const date = new Date(); 
    return date.toISOString().split('T')[0]; 
}


export {ChangePage, IsLoggedIn, GetRole, GetUsername, GetCurrentDate}