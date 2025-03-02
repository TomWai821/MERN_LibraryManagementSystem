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

const GetData = (data:string): string | undefined | null=> 
{
    switch(data)
    {
        case "authToken":
            return GetUserCookie("authToken") || sessionStorage.getItem("authToken") || undefined;
        
        case "role":
            return GetUserCookie("role") || sessionStorage.getItem("role") || undefined;

        case "username":
            return GetUserCookie("username") || sessionStorage.getItem("username") || undefined;
    }   
}


const IsAdmin = (role: string | undefined): boolean => 
{
    return role === "Admin";
}

const GetCurrentDate = (type:string): Date | string => 
{ 
    const date = new Date();
    switch(type)
    {
        case "String":
            return date.toISOString().split('T')[0] as string; 

        case "Date":
            return date as Date;
        
        default:
            return `Invalid type: ${type}`;
    }

}

const CalculateDueDate = (duration:number): Date => 
{
    const currentDate = new Date();
    let dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() + duration);

    return dueDate;
}

export {ChangePage, IsLoggedIn, GetData, IsAdmin, GetCurrentDate, CalculateDueDate}