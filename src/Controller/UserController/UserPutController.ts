import { GetData } from "../OtherController";

const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const fetchData = async (url: string, data: any) => 
{
    try 
    {
        console.log(data);
        const response = await fetch(url, 
        {
            method: 'PUT',
            headers: 
            { 
                'content-type': contentType, 
                'authToken': GetData("authToken") as string 
            },
            body: JSON.stringify(data)
        });

        if (response.ok) 
        {
            const result = await response.json();
            return result;
        } 
        else 
        {
            const errorResult = await response.json();
            throw new Error(errorResult.error || 'Something went wrong');
        }
    } catch (error) {
        console.log(error);
    }
};

const ModifyUserDataController = async (id: string, username:string, email:string, gender:string, role:string) => 
{
    const data = { username, email, gender, role };
    const url = `${localhost}/modifyData/id=${id}`;
    console.log(data);
    return await fetchData(url, data);
};

const ModifyStatusController = async (id: string, status: string, startDate?: Date, dueDate?: Date, description?: string) => 
{
    const data = { status, startDate, dueDate, description };
    const url = `${localhost}/modifyData/id=${id}`;
    return await fetchData(url, data);
};

export { ModifyUserDataController, ModifyStatusController };
