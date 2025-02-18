interface FilterInterface
{
    isAdmin:boolean;
}

interface BookSearchInterface
{
    bookname:string;
    genre:string;
    author:string;
    publisher:string;
    pages:string;
}

interface BookDataInterface extends BookSearchInterface
{
    amount:string;
}

interface UserDataInterface
{
    username:string;
    email:string;
    role:string;
    status:string;
    gender:string;
}

interface CreateUserInterface extends UserDataInterface
{
    password:string;
}


interface ActionTableCellInterface extends FilterInterface
{
    TableName: string;
    Information: UserDataInterface | BookDataInterface;
}

interface CreateModalInterface
{
    bookData?: UserDataInterface | BookDataInterface;
}

interface EditModalInterface
{
    editData: UserDataInterface | BookDataInterface;
    compareData: UserDataInterface | BookDataInterface;
}

interface TableInterface extends FilterInterface
{
    isLoggedIn: boolean;
}

interface BookRecordTableInterface extends TableInterface
{
    value: number;
    bookData: BookDataInterface[];
}

interface UserDataTableInterface extends FilterInterface
{
    value: number;
    userData: UserDataInterface[];
}

interface TabInterface extends FilterInterface
{
    tabLabel: { label: string; }[];
    value: number;
    valueChange: (newValue: number) => void;
}


export type {BookSearchInterface, BookDataInterface, UserDataInterface, CreateUserInterface, ActionTableCellInterface, FilterInterface, CreateModalInterface, EditModalInterface, BookRecordTableInterface, UserDataTableInterface, TabInterface}