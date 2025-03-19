import { BookResultDataInterface } from "./ResultModel";
import { TableInterface } from "./TablePagesAndModalModel";

interface BookSearchInterface
{
    bookname:string;
    language:string;
    genre:string;
    pages:number;
}

interface BookDataInterface extends BookSearchInterface
{
    description:string;
}

interface BookRecordTableInterface extends TableInterface
{
    value: number;
    bookData: BookResultDataInterface[][];
    paginationValue:number;
}
export type {BookSearchInterface, BookDataInterface, BookRecordTableInterface}