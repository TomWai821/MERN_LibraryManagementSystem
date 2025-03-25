const localhost:string = 'http://localhost:5000/api/book';
const contentType:string = "application/json";

export const deleteBookRecord = async (authToken:string, bookID:string) => 
{
    try
    {
        const response = await fetch(`${localhost}/bookData/id=${bookID}`,
            {
                method: 'DELETE',
                headers: {'content-type': contentType, 'authToken': authToken}
            }
        )

        if(response.ok)
        {
            const result = await response.json();
            return response.ok;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}