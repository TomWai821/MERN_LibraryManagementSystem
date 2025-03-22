import { BookResultDataInterface } from "./ResultModel";
import { TableInterface } from "./TablePagesAndModalModel";

interface BookSearchInterface
{
    bookname:string;
    language:string;
    languageID:string;
    genre:string;
    genreID:string;
}

interface BookDataInterface 
{
    bookname:string;
    language:string;
    genre:string;
    pages:number;
    description:string;
}

interface BookDataInterfaceForDelete extends BookDataInterface
{
    bookID:string;
}

interface BookRecordTableInterface extends TableInterface
{
    value: number;
    bookData: BookResultDataInterface[][];
    paginationValue:number;
}
export type {BookSearchInterface, BookDataInterface, BookDataInterfaceForDelete, BookRecordTableInterface}