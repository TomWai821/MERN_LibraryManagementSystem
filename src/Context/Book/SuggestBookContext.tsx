import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { SuggestBookContextProps, ChildProps } from "../../Model/ContextAndProviderModel";
import { BookDataInterface, GetResultInterface, LoanBookInterface } from "../../Model/ResultModel";
import { fetchLoanBook, fetchSuggestBook } from "../../Controller/BookController/BookGetController";
import { GetData } from "../../Controller/OtherController";

const SuggestBookContext = createContext<SuggestBookContextProps | undefined>(undefined);

export const SuggestBookProvider:FC<ChildProps> = ({children}) => 
{
    const [newPublishBook, setNewPublishBook] = useState<BookDataInterface[]>([]);
    const [mostPopularBook, setMostPopularBook] = useState<LoanBookInterface[]>([]);
    const [SelfLoanBook, setSelfLoanBook] = useState<LoanBookInterface[]>([]);
    const [bookForUser, setBookForUser] = useState<BookDataInterface[]>([]);
    const suggestBook = [newPublishBook, mostPopularBook, bookForUser];

    const authToken = GetData("authToken") as string;
    let dataForSuggestion = {};

    const fetchAllSuggestBook = useCallback(async() => 
    {
        const resultForNewPublishBook: GetResultInterface | undefined = await fetchSuggestBook("newPublish");
        const resultForMostPopularBook: GetResultInterface | undefined = await fetchSuggestBook("mostPopular");
        const resultForSelfLoanBook: GetResultInterface | undefined = await fetchLoanBook(authToken);

        if(resultForNewPublishBook && Array.isArray(resultForNewPublishBook.foundBook))
        {
            setNewPublishBook(resultForNewPublishBook.foundBook);
        }
    
        if(resultForMostPopularBook && Array.isArray(resultForMostPopularBook.foundLoanBook))
        {
            setMostPopularBook(resultForMostPopularBook.foundLoanBook);
        }

        if(resultForSelfLoanBook && Array.isArray(resultForSelfLoanBook.foundLoanBook))
        {
            setSelfLoanBook(resultForSelfLoanBook.foundLoanBook);
            dataForSuggestion = countAttributes(resultForSelfLoanBook.foundLoanBook);
        }

        const resultForUser: GetResultInterface | undefined = await fetchSuggestBook("forUser", authToken, dataForSuggestion);

        if(resultForUser && Array.isArray(resultForUser.foundBook))
        {
            console.log(resultForUser)
            setBookForUser(resultForUser.foundBook);
        }
    },[])

    const getTopThree = (countObj: Record<string, number>) => 
    {
        return Object.entries(countObj)
            .sort(([, a], [, b]) => b - a) // Sort by count in descending order
            .slice(0, 3) // Get top 3 entries
            .map(([key]) => key); // Extract only the names (keys)
    };


    const countAttributes = (books: LoanBookInterface[]) => 
    {
        // Create objects to store counts
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

        // Get top 3 genres, authors, and publishers
        const topGenres = getTopThree(genreCount);
        const topAuthors = getTopThree(authorCount);
        const topPublishers = getTopThree(publisherCount);

        return { topGenres, topAuthors, topPublishers };
    };


    useEffect(() => 
    {
        fetchAllSuggestBook();
    },[fetchAllSuggestBook])

    return (
        <SuggestBookContext.Provider value={{ suggestBook, SelfLoanBook }}>
            {children}
        </SuggestBookContext.Provider>
    );
}
    
export const useSuggestBookContext = () => 
{
    const context = useContext(SuggestBookContext);
    
    if (context === undefined) 
    {
        throw new Error("useSuggestContext must be used within a useSuggestProvider");
    }
    return context;
};
