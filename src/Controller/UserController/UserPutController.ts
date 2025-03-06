const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const fetchData = async (authToken:string ,url: string, data: any) => 
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
    } 
    catch (error) 
    {
        console.log(error);
    }
};

const ModifyUserDataController = async (authToken:string, id: string, username:string, email:string, gender:string, role:string) => 
{
    const data = { username, email, gender, role };
    const url = `${localhost}/modifyData/id=${id}`;
    return await fetchData(authToken, url, data);
};

const ModifyStatusController = async (authToken:string, id: string, status: string, startDate?: Date, dueDate?: Date, description?: string) => 
{
    const data = { status, startDate, dueDate, description };
    const url = `${localhost}/modifyData/id=${id}`;
    return await fetchData(authToken, url, data);
};

export { ModifyUserDataController, ModifyStatusController };
