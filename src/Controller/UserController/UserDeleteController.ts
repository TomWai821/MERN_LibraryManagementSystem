const localhost:string = 'http://localhost:5000/api/user';
const contentType:string = 'application/json';

const DeleteUserController = async(authToken:string, userId:string, deleteListId:string) => 
{
    try
    {
        const response = await fetch(`${localhost}/User/id=${userId}`,
            {
                method: 'DELETE',
                headers: 
                { 
                    'content-type': contentType,
                    'authToken': authToken
                },
                body:JSON.stringify({deleteListID: deleteListId})
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

export { DeleteUserController } 