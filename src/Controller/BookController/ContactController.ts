import { GetResultInterface } from "../../Model/ResultModel";

const url = "http://localhost:5000/api/book/contact/";
const contentType = "application/json";

export const GetContact = async (type:string) => 
{
    try
    {
        const response = await fetch(`${url}type=${type}`,
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

export const CreateContact = async (authToken:string, type:string, phoneNumber:string, email:string, contactName?:string, address?:string) => 
{
    const body = BuildBodyData(type, phoneNumber, email, contactName, address);

    try
    {
        const response = await fetch(`${url}type=${type}`,
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

export const EditContact = async (authToken:string, type:string, id:string, phoneNumber:string, email:string, contactName?:string, address?:string) => 
{
    const body = BuildBodyData(type, phoneNumber, email, contactName, address, id);

    try
    {
        const response = await fetch(`${url}type=${type}`,
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
        const response = await fetch(`${url}type=${type}`,
            {
                method: 'PUT',
                headers: { 'content-type': contentType, 'authToken': authToken },
                body: JSON.stringify({id})
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

const BuildBodyData = (type:string, phoneNumber:string, email:string, contactName?:string, address?:string, id?:string) => 
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
    