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


interface ActionTableCellInterface
{
    TableName: string;
    Information: UserDataInterface | BookDataInterface;
    isAdmin: boolean
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


export type {BookSearchInterface, BookDataInterface, UserDataInterface, CreateUserInterface, ActionTableCellInterface, FilterInterface, CreateModalInterface, EditModalInterface}