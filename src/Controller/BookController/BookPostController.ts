const contentType = "application/json";
const localhost:string = 'http://localhost:5000/api/book';

export const createBookRecord = async (authToken:string, image:File, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description:string, publishDate:string) => 
{
    const formData = createFormData(image, bookname, genreID, languageID, publisherID, authorID, description, publishDate);
    
    const response = await fetch(`${localhost}/bookData`,
        {
            method: 'POST',
            headers: { 'authToken': authToken },
            body: formData
        }
    );

    if(response.ok)
    {
        const result = await response.json();
        return response.ok;
    }
}

export const createLoanBookRecord = async (authToken:string, bookID:string, loanDate:Date, dueDate:Date, userID?:string) => 
{
    const loanBookBody:Record<string, any> =
    {
        ...(bookID && {bookID}),
        ...(userID && {userID}),
        ...(loanDate && {loanDate}),
        ...(dueDate && {dueDate})
    }

    console.log(loanBookBody);

    const response = await fetch(`${localhost}/LoanBook`,
        {
            method: 'POST',
            headers: { 'Content-Type': contentType, 'authToken': authToken },
            body: JSON.stringify(loanBookBody)
        }
    );
    
    if(response.ok)
    {
        const result = await response.json();
        return response.ok;
    }
}

const createFormData = (image:File, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description:string, publishDate:string) => 
{
    const formData = new FormData();
    formData.append('image', image);
    formData.append('bookname', bookname);
    formData.append('genreID', genreID);
    formData.append('languageID', languageID);
    formData.append('publisherID', publisherID);
    formData.append('authorID', authorID);
    formData.append('description',  description);
    formData.append('publishDate',  publishDate);

    return formData;
}