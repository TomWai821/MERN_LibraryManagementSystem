import { GetResultInterface } from "../../Model/ResultModel";

const localhost:string = 'http://localhost:5000/api/book';
const contentType:string = "application/json";

export const fetchBook = async (bookname?:string, genreID?:string, languageID?:string, publisherID?:string, authorID?:string) => 
{
    const queryString = BuildQuery({bookname, languageID, genreID, publisherID, authorID});

    const response = await fetch(`${localhost}/bookData${queryString ? `?${queryString}` : ``}`,
        {
            method: 'GET',
            headers: { 'content-type': contentType },
        }
    );

    if(response.ok)
    {
        const result: GetResultInterface = await response.json();
        return result;
    }
}

export const fetchSuggestBook = async (type:string, authToken?:string) => 
{
    const headers: Record<string, string> = 
    {
        'content-type': contentType
    }

    if(authToken)
    {
        headers['authToken'] = authToken;
    }

    const url = type === "newPublish" ? `${localhost}/bookData/type=${type}` : `${localhost}/loanBook/type=${type}`

    const response = await fetch(url,
        {
            method: 'GET',
            headers: headers,
        }
    );

    if(response.ok)
    {
        const result: GetResultInterface = await response.json();
        return result;
    }
}

export const fetchLoanBook = async() => 
{
    const response = await fetch(`${localhost}/loanBook`,
        {
            method: 'GET',
            headers: { 'content-type': contentType },
        }
    );

    if(response.ok)
    {
        const result: GetResultInterface = await response.json();
        console.log(result);
        return result;
    }
}

const BuildQuery = (params:Record<string, number | string | Date | undefined>) =>
{
    let queryParams = new URLSearchParams();
    for(const key in params)
    {
        if (params[key] === undefined || params[key] === null || params[key] === "" || params[key] === "All" || key.trim() === "") 
        {
            continue; 
        }
        else if(params[key] instanceof Date)
        {
            queryParams.append(key, (params[key] as Date).toISOString());
        }
        else
        {
            queryParams.append(key, params[key] as string);
        }
    }

    return queryParams.toString();
}