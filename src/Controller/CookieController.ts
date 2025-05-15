export const SetUserCookie = (authToken:string, username:string, role:string, avatarUrl:string, status:string, days:number, expires?:string) => 
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
    document.cookie = `authToken=${authToken};username=${username};role=${role};avatarUrl=${avatarUrl};status=${status};expires=${expires};path=/"` ;
}

export const GetUserCookie = (name:string) => 
{
    return document.cookie.split(';').find(row => row.startsWith(name+'='));
}