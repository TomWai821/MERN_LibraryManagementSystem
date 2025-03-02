const localhost:string = 'http://localhost:5000/api/user';
const contentType:string = 'application/json';

const DeleteUserController = async(userId:string) => 
{
    try
    {
        const response = await fetch(`${localhost}/remove/${userId}`,
            {
                method: 'POST',
                headers: { 'content-type': contentType }
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