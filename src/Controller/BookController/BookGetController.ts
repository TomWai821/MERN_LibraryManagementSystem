import { GetResultInterface } from "../../Model/ResultModel";

const localhost:string = 'http://localhost:5000/api/book';
const contentType:string = "application/json";

export const fetchBook = async (tableName:string, bookname?:string, genreID?:string, languageID?:string, publisherID?:string, authorID?:string) => 
{
    const queryString = BuildQuery({bookname, languageID, genreID, publisherID, authorID});

    const response = await fetch(`${localhost}/bookData/tableName=${queryString ? `${tableName}?${queryString}` : `${tableName}`}`,
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