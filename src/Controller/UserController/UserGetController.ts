import { GetResultInterface } from "../../Model/ResultModel";

const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const FetchUserData = async(authToken:string | null) => 
{
    try
    {
        const headers: Record<string, string> = 
        {
            'content-type': contentType
        }

        if(authToken)
        {
            headers['authToken'] = authToken;
        }

        const response = await fetch(`${localhost}/userData`,
            {
                method: 'GET',
                headers
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