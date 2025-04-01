const localhost:string = 'http://localhost:5000/api/book';
const contentType:string = "application/json";

export const updateBookRecord = async (authToken:string, bookID:string, imageName:string, newFile:File, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description: string) => 
{
    const data = createFormData(newFile, imageName, bookname, genreID, languageID, publisherID, authorID, description);

    const response = await fetch(`${localhost}/bookData/id=${bookID}`,
        {
            method: 'PUT',
            headers: { 'authToken': authToken },
            body: data
        }
    );

    console.log(response);

    if(response.ok)
    {
        const result = await response.json();
        return response.ok;
    }
}

export const returnBookAndChangeStatus = async (authToken:string, loanBookRecord:string) => 
{
    const response = await fetch(`${localhost}/LoanBook/id=${loanBookRecord}`,
        {
            method: 'PUT',
            headers: { 'content-type': contentType, 'authToken': authToken }
        }
    );
    
    if(response.ok)
    {
        const result = await response.json();
        return response.ok;
    }
}

const createFormData = (image:File, imageName:string, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description:string) => 
{
    const formData = new FormData();
    formData.append('image', image);
    formData.append('imageName', imageName);
    formData.append('bookname', bookname);
    formData.append('genreID', genreID);
    formData.append('languageID', languageID);
    formData.append('publisherID', publisherID);
    formData.append('authorID', authorID);
    formData.append('description',  description);

    return formData;
}