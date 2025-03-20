const localhost:string = 'http://localhost:5000/api/book';
const contentType:string = "application/json";

export const updateBookRecord = async (authToken:string, bookID:string, bookname:string, genreID:string, languageID:string, pages:number, description: string) => 
{
    const data = {bookname, genreID, languageID, pages, description}
    const response = await fetch(`${localhost}/bookData/id=${bookID}`,
        {
            method: 'PUT',
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