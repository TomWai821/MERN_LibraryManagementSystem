import { SuggestionData } from '../Model/ContextAndProviderModel';
import { LoanBookInterface, ResultInterface } from '../Model/ResultModel';
import { SetUserCookie, DeleteUserCookie } from './CookieController'

const mainPage:string = 'http://localhost:3000/';

const handleLogout = async(username: string | null) =>
{
    if(document.cookie)
    {
        DeleteUserCookie(username);
    }
    sessionStorage.clear();
    window.location.href = mainPage;
}

// For Register/Login
const handleSuccess = async(result: ResultInterface, stayLogin:boolean) =>
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
            sessionStorage.setItem("avatarUrl", userData.avatarUrl as string)
            return;
        }
        SetUserCookie(userData.authToken  as string, userData.username, userData.role , userData.status, userData.avatarUrl as string, 30);
    }
}

// For user status detect in Action TableCell for Admin
const StatusDetectionForAllUser = (status: string) => 
{
    const isNormal = status === "Normal";

    return {
        delete: { disable: !isNormal },
        banned: { disable: !isNormal },
    }
}

const StatusDetectionForBook = (status:string, value:string) =>
{
    return status === value;
}

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

const DisableValidationForLoanBook = (Information: LoanBookInterface) => 
{
    const returnedStatus = ["Returned", "Returned(Late)"];
    const status = Information.status || Information.bookDetails?.status;
    const result = returnedStatus.includes(status as string);
    return result;
}

export {handleLogout, handleSuccess, StatusDetectionForAllUser, StatusDetectionForBook, countAttributes, DisableValidationForLoanBook}