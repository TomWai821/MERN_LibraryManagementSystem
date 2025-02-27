import { GetResultInterface } from "../../Model/ResultModel";

const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const BuildQuery = (params:Record<string, string | undefined>) =>
{
    let queryParams = new URLSearchParams();
    for(const key in params)
    {
        if(params[key])
        {
            queryParams.append(key, params[key]!);
        }
    }

    return queryParams.toString();
}

const FetchUserData = async(authToken?:string, page?:string, amount?: string, username?: string, email?: string , role?: string , status?: string , gender?: string) => 
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

        let queryParams = BuildQuery({page, amount, username, email, role, status, gender});

        const queryString = queryParams.toString();
        const url = `${localhost}/userData${queryString ? `?${queryString}` : ''}`

        const response = await fetch(url,
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