const localhost:string = 'http://localhost:5000/api/book';
const contentType:string = "application/json";

export const createBookRecord = async (authToken:string, bookname:string, genreID:string, languageID:string, pages:number, description:string) => 
{
    const data = {bookname, genreID, languageID, pages, description}
    const response = await fetch(`${localhost}/bookData`,
        {
            method: 'POST',
            headers: { 'content-type': contentType, 'authToken': authToken },
            body: JSON.stringify(data)
        }
    );

    if(response.ok)
    {
        const result = await response.json();
        return response.ok;
    }
}