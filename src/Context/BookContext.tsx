import {createContext, useState, useEffect} from 'react';
import { BookContextProps } from '../Model/BookModel';
import { BookInterface } from '../Model/BookModel';

const BookContext = createContext<BookContextProps | undefined>(undefined);


const BookProvider = () => 
{
    const [book, setBook] = useState<BookInterface[]>([]);

    useEffect(() =>{}, []);

    return(
        <>
        </>
    );
}

export {BookContext, BookProvider}