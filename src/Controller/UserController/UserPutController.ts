const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const fetchData = async (authToken:string, url: string, data: any) => 
{
    console.log(data);
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
    const url = `${localhost}/modifyData/id=${userId}`;
    return await fetchData(authToken, url, data);
};

const ModifyBanListDataController = async(authToken:string, userId:string, banListID:string, dueDate:Date, description:string) => 
{
    const data = {banListID, dueDate, description}
    const url = `${localhost}/modifyBanList/id=${userId}`;
    return await fetchData(authToken, url, data);
}

const ModifyStatusController = async (authToken:string, userId: string, statusForUserList?: string, statusForBanList?:string, statusForDeleteList?:string, ListID?:string, startDate?: Date, dueDate?: Date, description?:string) => 
{
    const statusDataConfig = 
    {
        ban: () => 
        (
            { banListID: ListID, statusForBanList, statusForUserList}
        ),
        delete: () => 
        (
            { deleteListID: ListID, statusForDeleteList, statusForUserList }
        ),
        default: () => 
        (
            { statusForUserList, startDate, dueDate, description }
        ),
    }

    let statusType: keyof typeof statusDataConfig = statusForBanList ? "ban" : statusForDeleteList ? "delete" : "default";
    let statusData = statusDataConfig[statusType]();
    
    const url = `${localhost}/modifyStatus/id=${userId}`;
    return await fetchData(authToken, url, statusData);
};

export { ModifyUserDataController, ModifyBanListDataController, ModifyStatusController };
