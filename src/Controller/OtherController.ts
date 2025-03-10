import { GetUserCookie } from "./CookieController";

const MillionSecondsToDay = 1000 * 60 * 60 * 24;

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
        
        case "avatarUrl":
            return GetUserCookie("avatarUrl") || sessionStorage.getItem("avatarUrl") || undefined;

        case "status":
            return GetUserCookie("status") || sessionStorage.getItem("status") || undefined;
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

const TransferDateToString = (date: Date | undefined):string => 
{

    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US'); // Customize locale
}

const CalculateDuration = (startDate:Date, dueDate: Date | string) => 
{
    if(dueDate === "N/A")
    {
        return "Forever";
    }

    const start = new Date(startDate);
    const end = new Date(dueDate);

    const durationInMilliseconds = end.getTime() - start.getTime();
    const days = Math.floor(durationInMilliseconds / MillionSecondsToDay);

    return days.toLocaleString('en-US') + " Days";
}

const CountDuration = (dueDate: Date | string) => 
{
    if(dueDate === "N/A")
    {
        return "N/A";
    }

    const currentDate = new Date();
    const end = new Date(dueDate);

    const durationInMilliseconds = end.getTime() - currentDate.getTime();
    const days = Math.floor(durationInMilliseconds / MillionSecondsToDay);

    if(days < 1)
    {
        return "Less than 1 Day";
    }

    return days.toLocaleString('en-US') + " Days ";
}

export {ChangePage, IsLoggedIn, GetData, IsAdmin, GetCurrentDate, CalculateDueDate, TransferDateToString, CalculateDuration, CountDuration}