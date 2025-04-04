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
    const DataList = ["authToken", "role", "username", "avatarUrl", "status"];

    if(DataList.includes(data))
    {
        return GetUserCookie(data) || sessionStorage.getItem(data);
    }

    return undefined;
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

const TransferDateToISOString = (date: Date | string): string => 
{
    if (date instanceof Date) 
    {
        return date.toISOString().split("T")[0];
    }

    const parsedDate = new Date(date);
    
    if (!isNaN(parsedDate.getTime())) 
    {
        return parsedDate.toISOString().split("T")[0];
    }

    return "Invalid Date";
};

const TransferDateToString = (date: Date | undefined):string => 
{

    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US'); 
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

const countLateReturn = (dueDate: Date | string) => 
{
    const currentDate = new Date();
    const endDate = new Date(dueDate);

    const durationInMilliseconds = currentDate.getTime() - endDate.getTime() ;
    const days = Math.floor(durationInMilliseconds / MillionSecondsToDay);

    if(days < 0)
    {
        return "No";
    }

    return `Yes (${days.toLocaleString('en-US')} Days)`;
}

export {ChangePage, IsLoggedIn, GetData, IsAdmin, GetCurrentDate, CalculateDueDate, TransferDateToISOString, TransferDateToString, CalculateDuration, CountDuration, countLateReturn}