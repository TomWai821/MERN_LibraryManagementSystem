const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const fetchData = async (authToken:string, url: string, data: Record<string, any>) => 
{
    try 
    {
        const response = await fetch(url, 
        {
            method: 'PUT',
            headers: 
            { 
                'content-type': contentType, 
                'authToken': authToken
            },
            body: JSON.stringify(data)
        });

        console.log(response);

        if (response.ok) 
        {
            const result = await response.json();
            return result;
        } 
        else 
        {
            const errorResult = await response.json();
            throw new Error( await errorResult.text || 'Something went wrong');
        }
    } 
    catch (error) 
    {
        console.log(error);
    }
};

const ModifyUserDataController = async (authToken:string, userId: string, username:string, email:string, gender:string, role:string) => 
{
    const data = { username, email, gender, role };
    const url = `${localhost}/UserData/id=${userId}`;
    return await fetchData(authToken, url, data);
};

const ModifySuspendListDataController = async(authToken:string, userId:string, banListID:string, dueDate:Date, description:string) => 
{
    const data = { banListID, dueDate, description }
    const url = `${localhost}/SuspendListData/id=${userId}`;
    return await fetchData(authToken, url, data);
}

const ModifyStatusController = async (type:string, authToken:string, userId: string, statusForUserList?: string, ListID?:string, startDate?: Date, dueDate?: Date, description?:string) => 
{
    const statusDataConfig =
    {
        Suspend: { banListID: ListID, statusForUserList, startDate, dueDate, description },
        Delete: { deleteListID: ListID, statusForUserList, startDate, dueDate, description },
        UnDelete: { statusForUserList, deleteListID: ListID },
        UnSuspend: { statusForUserList, banListID: ListID }
    };

    console.log(statusForUserList);

    const statusData = statusDataConfig[type as keyof typeof statusDataConfig];
        
    const url = `${localhost}/Status/id=${userId}`;
    return await fetchData(authToken, url, statusData);
};

export { ModifyUserDataController, ModifySuspendListDataController, ModifyStatusController };
