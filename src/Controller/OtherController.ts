import { getUserCookie } from "./CookieController";

export const ChangePage = (location: string) => 
{
    window.location.href = location;
}

export const GetAuthToken = () => 
{
    const tokenFromCookie = document.cookie.split(';').find(row => row.startsWith('authToken='));

    if (tokenFromCookie || sessionStorage.getItem('authToken')) 
    {
        return true;
    }
    return false;
}

export const GetRole = (): string | undefined => 
{
    return getUserCookie("role") || sessionStorage.getItem("role") || undefined;
}