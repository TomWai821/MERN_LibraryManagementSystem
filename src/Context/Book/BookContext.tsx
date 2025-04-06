import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { BookContextProps, ChildProps, SuggestionData } from "../../Model/ContextAndProviderModel";
import { CalculateDueDate, GetCurrentDate, GetData } from "../../Controller/OtherController";
import { BookDataInterface, GetResultInterface, LoanBookInterface } from "../../Model/ResultModel";
import { fetchBook, fetchFavouriteBook, fetchLoanBook, fetchSuggestBook } from "../../Controller/BookController/BookGetController";
import { createBookRecord, createFavouriteBookRecord, createLoanBookRecord } from "../../Controller/BookController/BookPostController";
import { returnBookAndChangeStatus, updateBookRecord } from "../../Controller/BookController/BookPutController";
import { deleteBookRecord } from "../../Controller/BookController/BookDeleteController";
import { countAttributes } from "../../Controller/OtherUsefulController";

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider:FC<ChildProps> = ({children}) => 
{
    const [AllBook, setAllBook] = useState<BookDataInterface[]>([]);
    const [OnLoanBook, setOnLoanBook] = useState<LoanBookInterface[]>([]);
    const bookData = [AllBook, OnLoanBook];

    const [newPublishBook, setNewPublishBook] = useState<BookDataInterface[]>([]);
    const [mostPopularBook, setMostPopularBook] = useState<LoanBookInterface[]>([]);
    const [bookForUser, setBookForUser] = useState<BookDataInterface[]>([]);
    const suggestBook = [bookForUser, newPublishBook, mostPopularBook];

    const [SelfLoanBook, setSelfLoanBook] = useState<LoanBookInterface[]>([]);
    const [FavouriteBook, setFavouriteBook] = useState<LoanBookInterface[]>([]);
    const BookRecordForUser = [SelfLoanBook, FavouriteBook];
    
    const authToken = GetData("authToken") as string;

    const fetchAllBook = useCallback(async () => 
    {
        const resultForAllBook: GetResultInterface | undefined = await fetchBook("All");
        const resultForLoanBook: GetResultInterface | undefined = await fetchLoanBook();
        
        if(resultForAllBook && Array.isArray(resultForAllBook.foundBook))
        {
            setAllBook(resultForAllBook.foundBook);
        }

        if(resultForLoanBook && Array.isArray(resultForLoanBook.foundLoanBook))
        {
            setOnLoanBook(resultForLoanBook.foundLoanBook);
        }

        const resultForNewPublishBook: GetResultInterface | undefined = await fetchSuggestBook("newPublish");
        const resultForMostPopularBook: GetResultInterface | undefined = await fetchSuggestBook("mostPopular");
    
        if (resultForNewPublishBook && Array.isArray(resultForNewPublishBook.foundBook))
        {
            setNewPublishBook(resultForNewPublishBook.foundBook);
        }
    
        if (resultForMostPopularBook && Array.isArray(resultForMostPopularBook.foundLoanBook)) 
        {
            setMostPopularBook(resultForMostPopularBook.foundLoanBook);
        }
    
        if (authToken) 
        {
            const resultForSelfLoanBook: GetResultInterface | undefined = await fetchLoanBook(authToken);
    
            if (resultForSelfLoanBook && Array.isArray(resultForSelfLoanBook.foundLoanBook)) 
            {
                setSelfLoanBook(resultForSelfLoanBook.foundLoanBook);

                const suggestionData = countAttributes(resultForSelfLoanBook.foundLoanBook);
    
                if (suggestionData.topAuthors.length > 0 || suggestionData.topGenres.length > 0 || suggestionData.topPublishers.length > 0) 
                {
    
                    const resultForUser: GetResultInterface | undefined = await fetchSuggestBook("forUser", authToken, suggestionData);
    
                    if (resultForUser && Array.isArray(resultForUser.foundBook)) 
                    {
                        setBookForUser(resultForUser.foundBook);
                    }
                }
            }

            const resultForFavouriteBook: GetResultInterface | undefined = await fetchFavouriteBook(authToken);

            if (resultForFavouriteBook && Array.isArray(resultForFavouriteBook.foundFavouriteBook)) 
            {
                setFavouriteBook(resultForFavouriteBook.foundFavouriteBook);
            }
        }
    },[])

    const fetchBookWithFliterData = useCallback(async (type:string, bookname?:string, status?:string, genreID?:string, languageID?:string, authorID?:string, publisherID?:string) => 
    {
        let result: GetResultInterface | undefined;
        
        switch(type)
        {
            case "All":
                result = await fetchBook(bookname as string, status as string, genreID as string, languageID as string, authorID as string, publisherID as string);
                
                if(result && Array.isArray(result.foundBook))
                {
                    setAllBook(result.foundBook);
                }
                break;

            case "Favourite":
                result = await fetchFavouriteBook(authToken, bookname, status, genreID, languageID, authorID, publisherID);

                if(result && Array.isArray(result.foundFavouriteBook))
                {
                    setFavouriteBook(result.foundFavouriteBook);
                }
                break;
        }

        
    },[fetchAllBook])

    const fetchLoanBookWithFliterData = useCallback(async (type:string, bookname?:string, username?:string, status?:string) => 
    {
        let result: GetResultInterface | undefined;
        
        switch(type)
        {
            case "AllUser":
                result = await fetchLoanBook(authToken, bookname, username, status);

                if(result && Array.isArray(result.foundLoanBook))
                {
                    setOnLoanBook(result.foundLoanBook);
                }
                break;

            case "Self":
                result = await fetchLoanBook(authToken, bookname, undefined, status);

                if(result && Array.isArray(result.foundLoanBook))
                {
                    setSelfLoanBook(result.foundLoanBook);
                }
                break;
        }
        
    },[fetchAllBook])

    const createBook = useCallback(async (image:File, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description:string, publishDate:string) => 
    {
        const result = await createBookRecord(authToken, image, bookname, genreID, languageID, publisherID, authorID, description, publishDate);

        if(result)
        {
            fetchAllBook();
        }
    },[fetchAllBook])

    const editBook = useCallback(async (bookID:string, imageName:string, newFile:File, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description:string) => 
    {
        const result = await updateBookRecord(authToken, bookID, imageName, newFile, bookname, genreID, languageID, publisherID, authorID, description);

        if(result)
        {
            fetchAllBook();
        }
    },[fetchAllBook])

    const loanBook = useCallback(async(bookID:string, userID?:string) => 
    {
        const loanDate = GetCurrentDate("Date") as Date
        const dueDate = CalculateDueDate(7);
        const result = await createLoanBookRecord(authToken, bookID, loanDate, dueDate, userID);

        if(result)
        {
            fetchAllBook()
        }
    },[fetchAllBook])

    const returnBook = useCallback(async(loanRecordID:string) =>
    {
        const result = await returnBookAndChangeStatus(authToken, loanRecordID);

        if(result)
        {
            fetchAllBook()
        }
    },[])

    const deleteBook = useCallback(async (bookID:string) => 
    {
        const result = await deleteBookRecord("Book", authToken, bookID);

        if(result)
        {
            fetchAllBook();
        }

    },[fetchAllBook])

    const favouriteBook = useCallback(async(bookID:string) => 
    {
        const result = await createFavouriteBookRecord(authToken, bookID);

        if(result)
        {
            fetchAllBook();
            return true;
        }

        return false;
    },[fetchAllBook])

    const unfavouriteBook = useCallback(async(FavouriteBookID:string) => 
    {
        const result = await deleteBookRecord("Favourite", authToken, FavouriteBookID);

        if(result)
        {
            fetchAllBook();
            return true;
        }
        
        return false;
    },[fetchAllBook])

    useEffect(() => 
    {
        fetchAllBook();
    },[])

    return (
        <BookContext.Provider value={{ bookData, suggestBook, BookRecordForUser, fetchAllBook, fetchBookWithFliterData, fetchLoanBookWithFliterData, createBook, editBook, loanBook, returnBook, deleteBook, favouriteBook, unfavouriteBook }}>
            {children}
        </BookContext.Provider>
    );
}
    
export const useBookContext = () => 
{
    const context = useContext(BookContext);
    
    if (context === undefined) 
    {
        throw new Error("useBookContext must be used within a BookProvider");
    }
    return context;
};
