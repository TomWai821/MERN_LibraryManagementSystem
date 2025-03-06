const localhost:string = 'http://localhost:5000/api/user';
const contentType:string = 'application/json';

const DeleteUserController = async(authToken:string, userId:string) => 
{
    try
    {
        const response = await fetch(`${localhost}/remove/id=${userId}`,
            {
                method: 'DELETE',
                headers: { 
                    'content-type': contentType,
                    'authToken': authToken
                }
            }
        )

        console.log(response);
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