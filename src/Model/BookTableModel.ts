import { TableInterface } from "./TablePagesAndModalModel";

interface BookSearchInterface
{
    bookname:string;
    language:string;
    genre:string;
    author:string;
    publisher:string;
    pages:string;
}

interface BookDataInterface extends BookSearchInterface
{
    amount:string;
}

interface BookRecordTableInterface extends TableInterface
{
    value: number;
    bookData: BookDataInterface[];
}

export type {BookSearchInterface, BookDataInterface, BookRecordTableInterface}