import { BookDataInterface, LoanBookInterface } from "./ResultModel";
import { TableInterface } from "./TablePagesAndModalModel";

interface BookSearchInterface
{
    bookname:string;
    username:string;
    status:string;
    language:string;
    languageID:string;
    genre:string;
    genreID:string;
    author:string;
    authorID:string;
    publisher:string; 
    publisherID:string;
}

interface BookTableDataInterface 
{
    bookname:string;
    language:string;
    genre:string;
    author:string;
    publisher:string;
    description:string;
}

interface BookDataInterfaceForDelete extends BookTableDataInterface
{
    bookID:string;
}

interface BookRecordTableInterface extends TableInterface
{
    value: number;
    bookData: (BookDataInterface[] | LoanBookInterface[])[] | LoanBookInterface[];
    paginationValue:number;
}
export type {BookSearchInterface, BookTableDataInterface, BookDataInterfaceForDelete, BookRecordTableInterface}