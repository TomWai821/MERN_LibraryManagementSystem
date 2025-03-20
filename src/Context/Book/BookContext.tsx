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
    const [LoanBook, setLoanBook] = useState<BookResultDataInterface[]>([]);
    const [OnShelfBook, setOnShelfBook] = useState<BookResultDataInterface[]>([]);
    const authToken = GetData("authToken") as string;

    const fetchAllBook = useCallback(async () => 
    {
        const resultForAllBook: GetResultInterface | undefined = await fetchBook();
        const resultForLoanBook: GetResultInterface | undefined = await fetchBook();
        const resultForOnShelfBook: GetResultInterface | undefined = await fetchBook();

        if(resultForAllBook && Array.isArray(resultForAllBook.foundBook))
        {
            setAllBook(resultForAllBook.foundBook);
        }

        /*
        if(resultForLoanBook && Array.isArray(resultForLoanBook.foundBook))
        {
            setLoanBook(resultForLoanBook.foundBook);
        }

        if(resultForOnShelfBook && Array.isArray(resultForOnShelfBook.foundBook))
        {
            setOnShelfBook(resultForOnShelfBook.foundBook);
        }
        */
    },[])

    const createBook = useCallback(async (bookname:string, genreID:string, languageID:string, page:number, description:string) => 
    {
        const result = await createBookRecord(authToken, bookname, genreID, languageID, page, description);

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
        },[fetchAllBook]
    )

    useEffect(() => 
        {
            fetchAllBook();
        },[]
    )

    return (
        <BookContext.Provider value={{ AllBook, LoanBook, OnShelfBook, fetchAllBook, createBook, editBook, deleteBook }}>
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
