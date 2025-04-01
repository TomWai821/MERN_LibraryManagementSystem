import { GetResultInterface } from "../../Model/ResultModel";

const localhost = "http://localhost:5000/api/book/contact/";
const contentType = "application/json";

export const GetContact = async (type:string, author?:string, publisher?:string) => 
{
    try
    {
        const invalidQuery = (type === "Author" && publisher) || (type === "Publisher" && author);
        let query:string = "";

        if (invalidQuery)
        {
            console.log(`Invalid query data: ${type === "Author" ? "publisher" : "author"}`);
            return undefined;
        }
    
        switch(type)
        {
            case "Author":
                if(author)
                {
                    query = `?author=${author}`;
                }
                break;
        
            case "Publisher":
                if(publisher)
                {
                    query = `?publisher=${publisher}`;
                }
                break;
        }

        const url = `${localhost}type=${type}${query}`;
        
        const response = await fetch(url,
            {
                method: 'GET',
                headers: { 'content-type': contentType }
            }
        );

        if(response.ok)
        {
            const result:GetResultInterface = await response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export const CreateContact = async (authToken:string, type:string, contactName:string, phoneNumber:string, email:string, address?:string) => 
{
    const body = BuildBodyData(type, contactName, phoneNumber, email, address);

    try
    {
        const response = await fetch(`${localhost}type=${type}`,
            {
                method: 'POST',
                headers: { 'content-type': contentType, 'authToken': authToken },
                body: JSON.stringify(body)
            }
        );

        if(response.ok)
        {
            const result:GetResultInterface = await response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export const EditContact = async (authToken:string, type:string, contactName:string, phoneNumber:string, email:string, address?:string, id?:string) => 
{
    const body = BuildBodyData(type, contactName, phoneNumber, email, address, id);

    try
    {
        const response = await fetch(`${localhost}type=${type}`,
            {
                method: 'PUT',
                headers: { 'content-type': contentType, 'authToken': authToken },
                body: JSON.stringify(body)
            }
        );

        if(response.ok)
        {
            const result:GetResultInterface = await response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export const DeleteContact= async (authToken:string, type:string, id:string) => 
{
    try
    {
        const response = await fetch(`${localhost}type=${type}`,
            {
                method: 'DELETE',
                headers: { 'content-type': contentType, 'authToken': authToken },
                body: JSON.stringify({id: id})
            }
        );

        console.log(response);

        if(response.ok)
        {
            const result:GetResultInterface = await response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

const BuildBodyData = (type:string, contactName:string, phoneNumber:string, email:string,  address?:string, id?:string) => 
{

    let data:Record<string, any> = 
    {
        ...(id && {id}),
        ...(phoneNumber && {phoneNumber}),
        ...(email && {email})
    };

    switch(type)
    {
        case "Publisher":
            data.publisher = contactName;
            data.address = address;
            break;
        
        case "Author":
            data.author = contactName;
            break;

        default:
            return console.log(`Invalid type ${type}`);
    }
    return data;
}
    