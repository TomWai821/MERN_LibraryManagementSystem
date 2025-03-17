import { createContext, FC, useContext, useState } from "react";
import { BookContextProps, ChildProps } from "../../Model/ContextAndProviderModel";
import { GetData } from "../../Controller/OtherController";
import { BookResultDataInterface } from "../../Model/ResultModel";
import { fetchBook } from "../../Controller/BookController/BookGetController";
import { createBookRecord } from "../../Controller/BookController/BookPostController";

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider:FC<ChildProps> = ({children}) => 
{
    const [AllBook, setAllBook] = useState<BookResultDataInterface[]>([]);
    const authToken = GetData("authToken") as string;

    const fetchAllBook = async () => 
    {
        const result: BookResultDataInterface[] | undefined = await fetchBook();

        if(result)
        {
            setAllBook(result);
        }
    }

    const createBook = async (bookname:string, genreID:string, languageID:string, page:number, description:string) => 
    {
        const result = await createBookRecord(bookname, genreID, languageID, page, description);

        if(result)
        {
            fetchAllBook();
        }
    }

    return (
        <BookContext.Provider value={{ AllBook, fetchAllBook, createBook }}>
            {children}
        </BookContext.Provider>
    );
}
    
export const useDefinationContext = () => 
{
    const context = useContext(BookContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
