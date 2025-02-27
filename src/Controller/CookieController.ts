const SetUserCookie = (authToken:string, username:string, role:string, days:number, expires?:string) => 
{
    if(!expires)
    {
        let expires = "";
        if(days)
        {
            const date = new Date();
            const milliSeconds = days * 24 * 60 * 60 * 1000;
            date.setTime(date.getTime() + milliSeconds);
            expires = ":expires=" + date.toUTCString();
        }
    }
    document.cookie = "authToken="+ authToken + ";username=" + username +"; role=" + role + expires +";path=/" ;
}

const GetUserCookie = (name:string) => 
{
    return document.cookie.split(';').find(row => row.startsWith(name+'='));
}
    
const DeleteUserCookie = (username: string | null) =>
{
    document.cookie = "authToken=" + username + '; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export {SetUserCookie, GetUserCookie, DeleteUserCookie}