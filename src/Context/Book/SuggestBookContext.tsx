import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { SuggestBookContextProps, ChildProps } from "../../Model/ContextAndProviderModel";
import { BookDataInterface, GetResultInterface, LoanBookInterface } from "../../Model/ResultModel";
import { fetchSuggestBook } from "../../Controller/BookController/BookGetController";

const SuggestBookContext = createContext<SuggestBookContextProps | undefined>(undefined);

export const SuggestBookProvider:FC<ChildProps> = ({children}) => 
{
    const [newPublishBook, setNewPublishBook] = useState<BookDataInterface[]>([]);
    const [mostPopularBook, setMostPopularBook] = useState<LoanBookInterface[]>([]);
    const [bookForUser, setBookForUser] = useState<BookDataInterface[]>([]);
    const suggestBook = [newPublishBook, mostPopularBook, bookForUser];

    const fetchAllSuggestBook = useCallback(async() => 
    {
        const resultForNewPublishBook: GetResultInterface | undefined = await fetchSuggestBook("newPublish");
        const resultForMostPopularBook: GetResultInterface | undefined = await fetchSuggestBook("mostPopular");

        if(resultForNewPublishBook && Array.isArray(resultForNewPublishBook.foundBook))
        {
            setNewPublishBook(resultForNewPublishBook.foundBook);
        }
    
        if(resultForMostPopularBook && Array.isArray(resultForMostPopularBook.foundLoanBook))
        {
            setMostPopularBook(resultForMostPopularBook.foundLoanBook);
        }
    },[])

    useEffect(() => 
    {
        fetchAllSuggestBook();
    },[fetchAllSuggestBook])

    return (
        <SuggestBookContext.Provider value={{ suggestBook }}>
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
