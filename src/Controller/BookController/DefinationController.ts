const url = "http://localhost:5000/api/book/defination/";
const contentType = "application/json";

const GetDefination = async (type:string) => 
{
    try
    {
        const response = await fetch(url+`type=${type}`,
            {
                method: 'GET',
                headers: { 'content-type': contentType }
            }
        );

        if(response.ok)
        {
            const result = response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

const CreateDefinationData = async (type:string, authToken:string, shortName:string, detailsName:string) => 
{
    try
    {
        const data = BuildBodyData(type, shortName, detailsName, undefined);

        const response = await fetch(url+`type=${type}`,
            {
                method: 'POST',
                headers: { 'content-type': contentType, 'authToken': authToken },
                body: JSON.stringify(data)
            }
        );

        if(response.ok)
        {
            const result = response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

const EditDefinationData = async (type:string, authToken:string, id:string, shortName:string, detailsName:string) => 
{        
    const data = BuildBodyData(type, shortName, id, detailsName);

    try
    {
        const response = await fetch(url+`type=${type}`,
            {
                method: 'PUT',
                headers: { 'content-type': contentType, 'authToken': authToken  },
                body: JSON.stringify(data)
            }
        );

        if(response.ok)
        {
            const result = response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

const DeleteDefinationData = async (type:string, authToken:string, id:string) => 
{
    try
    {
        const response = await fetch(url+`type=${type}`,
            {
                method: 'DELETE',
                headers: { 'content-type': contentType, 'authToken': authToken  },
                body: JSON.stringify({id})
            }
        );

        if(response.ok)
        {
            const result = response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

const BuildBodyData = (type:string, shortName:string, detailsName:string, id?:string) => 
{
    let data:Record<string, any> = {shortName};

    if(id)
    {
        data.id = id;
    }

    switch(type)
    {
        case "Genre":
            data.genre = detailsName;
            break;
        
        case "Language":
            data.language = detailsName;
            break;

        default:
            return console.log(`Invalid type ${type}`);
    }
    return data;
}

export {GetDefination, CreateDefinationData, EditDefinationData, DeleteDefinationData}