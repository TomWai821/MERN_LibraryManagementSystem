import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { BookContextProps, ChildProps } from "../../Model/ContextAndProviderModel";
import { GetData } from "../../Controller/OtherController";
import { BookResultDataInterface, GetResultInterface } from "../../Model/ResultModel";
import { fetchBook } from "../../Controller/BookController/BookGetController";
import { createBookRecord } from "../../Controller/BookController/BookPostController";
import { updateBookRecord } from "../../Controller/BookController/BookPutController";
import { deleteBookRecord } from "../../Controller/BookController/BookDeleteController";

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider:FC<ChildProps> = ({children}) => 
{
    const [AllBook, setAllBook] = useState<BookResultDataInterface[]>([]);
    const [OnLoanBook, setOnLoanBook] = useState<BookResultDataInterface[]>([]);
    const authToken = GetData("authToken") as string;
    const bookData = [AllBook, OnLoanBook];

    const fetchAllBook = useCallback(async () => 
    {
        const resultForAllBook: GetResultInterface | undefined = await fetchBook("AllBook");
        /*
        const resultForLoanBook: GetResultInterface | undefined = await fetchBook("LoanBook");
        */

        if(resultForAllBook && Array.isArray(resultForAllBook.foundBook))
        {
            setAllBook(resultForAllBook.foundBook);
        }

        /*
        if(resultForLoanBook && Array.isArray(resultForLoanBook.foundBook))
        {
            setLoanBook(resultForLoanBook.foundBook);
        }
        */
    },[])

    const fetchBookWithFliterData = useCallback(async (tableName:string, bookname?:string, genreID?:string, languageID?:string) => 
    {
        const result: GetResultInterface | undefined = await fetchBook(tableName, bookname, genreID, languageID);

        if(result && Array.isArray(result.foundBook))
        {
            switch(tableName)
            {
                case "AllBook":
                    setAllBook(result.foundBook);
                    break;

                /*
                case "OnLoanBook":
                    setLoanBook(result.foundBook);
                    break;
                */
            }
        }
    },[])

    const createBook = useCallback(async (image:File, bookname:string, genreID:string, languageID:string, page:number, description:string) => 
    {
        const result = await createBookRecord(authToken, image, bookname, genreID, languageID, page, description);

        if(result)
        {
            fetchAllBook();
        }
    },[fetchAllBook])

    const editBook = useCallback(async (bookID:string, bookname:string, genreID:string, languageID:string, pages:number, description: string) => 
        {
            const result = await updateBookRecord(authToken, bookID, bookname, genreID, languageID, pages, description)

            if(result)
            {
                fetchAllBook();
            }
        },[fetchAllBook]
    )

    const deleteBook = useCallback(async (bookID:string) => 
    {
        const result = await deleteBookRecord(authToken, bookID)

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
        <BookContext.Provider value={{ bookData, fetchAllBook, fetchBookWithFliterData, createBook, editBook, deleteBook }}>
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
