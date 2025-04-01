import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { BookContextProps, ChildProps } from "../../Model/ContextAndProviderModel";
import { GetData } from "../../Controller/OtherController";
import { BookDataInterface, GetResultInterface, LoanBookInterface } from "../../Model/ResultModel";
import { fetchBook, fetchLoanBook } from "../../Controller/BookController/BookGetController";
import { createBookRecord, createLoanBookRecord } from "../../Controller/BookController/BookPostController";
import { returnBookAndChangeStatus, updateBookRecord } from "../../Controller/BookController/BookPutController";
import { deleteBookRecord } from "../../Controller/BookController/BookDeleteController";

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider:FC<ChildProps> = ({children}) => 
{
    const [AllBook, setAllBook] = useState<BookDataInterface[]>([]);
    const [OnLoanBook, setOnLoanBook] = useState<LoanBookInterface[]>([]);
    const bookData = [AllBook, OnLoanBook];
    
    const authToken = GetData("authToken") as string;

    const fetchAllBook = useCallback(async () => 
    {
        const resultForAllBook: GetResultInterface | undefined = await fetchBook();
        const resultForLoanBook: GetResultInterface | undefined = await fetchLoanBook();
        
        if(resultForAllBook && Array.isArray(resultForAllBook.foundBook))
        {
            setAllBook(resultForAllBook.foundBook);
        }

        if(resultForLoanBook && Array.isArray(resultForLoanBook.foundLoanBook))
        {
            setOnLoanBook(resultForLoanBook.foundLoanBook);
        }
    },[])

    const fetchAllBookWithFliterData = useCallback(async (bookname?:string, genreID?:string, languageID?:string, authorID?:string, publisherID?:string) => 
    {
        const result: GetResultInterface | undefined = await fetchBook(bookname as string, genreID as string, languageID as string, authorID as string, publisherID as string);

        if(result && Array.isArray(result.foundBook))
        {
            setAllBook(result.foundBook);
        }
    },[fetchAllBook])

    const fetchLoanBookWithFliterData = useCallback(async (bookname?:string, username?:string, status?:string) => 
    {
        const result: GetResultInterface | undefined = await fetchLoanBook(authToken, bookname, username, status);

        if(result && Array.isArray(result.foundLoanBook))
        {
            setOnLoanBook(result.foundLoanBook);
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

    const loanBook = useCallback(async(userID:string, bookID:string) => 
    {
        const result = await createLoanBookRecord(authToken, userID, bookID);

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
        const result = await deleteBookRecord(authToken, bookID);

        if(result)
        {
            fetchAllBook();
        }

    },[fetchAllBook])

    useEffect(() => 
    {
        fetchAllBook();
    },[])

    return (
        <BookContext.Provider value={{ bookData, fetchAllBook, fetchAllBookWithFliterData, fetchLoanBookWithFliterData, createBook, editBook, loanBook, returnBook, deleteBook }}>
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
