let cookie:string = document.cookie;

export const setUserCookie = (authToken:string, name:string, days:number) => 
{
    let expires = "";
    if(days)
    {
        const date = new Date();
        const milliSeconds = days * 24 * 60 * 60 * 1000;
        date.setTime(date.getTime() + milliSeconds);
        expires = ":expires=" + date.toUTCString();
    }
    document.cookie = "authToken="+ authToken + ":name=" + name + expires +":path=/" ;
}

export const getUserCookie = (name:string) => 
{
    let cookieArr = cookie.split(":");
    
    for(let i = 0; i < cookieArr.length; i++)
    {
        let cookiePair = cookieArr[i].split("=");
    
        if(name == cookiePair[0])
        {
            console.log(cookiePair[1])
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    return null;
}
    
export const deleteUserCookie = () =>
{
    document.cookie = "authToken=";
}