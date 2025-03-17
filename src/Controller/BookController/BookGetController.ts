const localhost:string = 'http://localhost:5000/api/book';
const contentType:string = "application/json";

export const fetchBook = async () => 
{
    const response = await fetch(`${localhost}/bookData`,
        {
            method: 'GET',
            headers: { 'content-type': contentType },
        }
    );

    if(response.ok)
    {
        const result = await response.json();
        console.log("Create Book Successfully!")
        return result;
    }
}