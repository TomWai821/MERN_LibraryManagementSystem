import { LoanBookInterface, ResultInterface } from '../Model/ResultModel';
import { SetUserCookie } from './CookieController'

// For Register/Login
export const handleSuccess = async(result: ResultInterface, stayLogin:boolean) =>
{
    const userData = result.data;
    if(userData)
    {
        if(!stayLogin)
        {
            sessionStorage.setItem("authToken", userData.authToken as string);
            sessionStorage.setItem("username", userData.username);
            sessionStorage.setItem("role", userData.role);
            sessionStorage.setItem("status", userData.status);
            sessionStorage.setItem("avatarUrl", userData.avatarUrl as string);
            return;
        }
        
        SetUserCookie(userData.authToken as string, userData.username, userData.role , userData.status, userData.avatarUrl as string, 30);
    }
}

export const StatusDetection = (status:string, value:string) =>
{
    return status === value;
}

/*
const getTopThree = (countObject: Record<string, number>) => 
{
    return Object.entries(countObject)
        .sort(([, first], [, second]) => second - first)
        .slice(0, 3)
        .map(([key]) => key);
};

const countAttributes = (books: LoanBookInterface[]): SuggestionData  => 
{
    const genreCount: Record<string, number> = {};
    const authorCount: Record<string, number> = {};
    const publisherCount: Record<string, number> = {};

    books.forEach((book) => 
    {
        const genre = book.genreDetails?.genre;

        if (genre) 
        {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
        }
        
        const author = book.authorDetails?.author;

        if (author) 
        {
            authorCount[author] = (authorCount[author] || 0) + 1;
        }

        const publisher = book.publisherDetails?.publisher;

        if (publisher) 
        {
            publisherCount[publisher] = (publisherCount[publisher] || 0) + 1;
        }
    });
    return { topGenres: getTopThree(genreCount), topAuthors: getTopThree(authorCount),topPublishers: getTopThree(publisherCount) };
};

*/
export const DisableValidationForLoanBook = (Information: LoanBookInterface) => 
{
    const returnedStatus = ["Returned", "Returned(Late)"];
    const status = Information.status || Information.bookDetails?.status;
    const result = returnedStatus.includes(status as string);
    return result;
}

export const TabProps = (index: number) =>
{
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}