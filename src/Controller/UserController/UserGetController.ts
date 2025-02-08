import { GetResultInterface } from "../../Model/ResultModel";

const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const FetchUserData = async(authToken:string) => 
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
        const result: GetResultInterface = await response.json();
        return result;
    }
    catch(error)
    {
        console.log("");
    }
}

export { FetchUserData }