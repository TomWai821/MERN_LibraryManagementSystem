import { UserDataInterface } from "../../Model/TablePageModel";
import { GetData } from "../OtherController";

const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const ModifyUserDataController = async(id:string, data:UserDataInterface) => 
{
    try
    {

        const url = `${localhost}/modifyData/id=${id}`;
        const response = await fetch(url,
            {
                method: 'PUT',
                headers: { 
                    'content-type': contentType, 
                    'authToken': GetData("authToken") as string
                },
                body: JSON.stringify(data)
            }
        );

        if(response.ok)
        {
            const result = await response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

const ModifyStatusController = async (id:string, status:string, startDate:Date, dueDate:Date, description:string) => 
{
    const data = {status, startDate, dueDate, description};
    try
    {
        const url = `${localhost}/modifyData/id=${id}`;
        const response = await fetch(url,
            {
                method: 'PUT',
                headers: { 
                    'content-type': contentType, 
                    'authToken': GetData("authToken") as string
                },
                body: JSON.stringify(data)
            }
        )

        if(response.ok)
        {
            const result = await response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export {ModifyUserDataController, ModifyStatusController}