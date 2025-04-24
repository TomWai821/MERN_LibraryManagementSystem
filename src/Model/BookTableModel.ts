import { ContactState } from "./ContextAndProviderModel";
import { BookDataInterface, ContactInterface, LoanBookInterface } from "./ResultModel";
import { TableInterface } from "./TablePagesAndModalModel";

interface BookSearchInterface extends SelfLoanBookSearchInterface, ContactSearchInterface
{
    username:string;
    language:string;
    genre:string;
    finesPaid?:string;
}

interface SelfLoanBookSearchInterface
{
    bookname:string;
    status:string;
}

interface ContactSearchInterface
{
    author:string;
    publisher:string;
}

interface BookTableDataInterface extends ContactSearchInterface
{
    bookname:string;
    language:string;
    genre:string;
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

interface ContactTableInterface extends TableInterface
{
    value?: number;
    contactData: ContactState;
    paginationValue:number;
}

export type {BookSearchInterface, SelfLoanBookSearchInterface, ContactSearchInterface, BookTableDataInterface, BookDataInterfaceForDelete, BookRecordTableInterface, ContactTableInterface}