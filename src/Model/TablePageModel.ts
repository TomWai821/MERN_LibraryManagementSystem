interface FilterInterface
{
    isAdmin:boolean;
}

interface BookSearchInterface
{
    name:string;
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
    name:string;
    email:string;
    role:string;
    status:string;
    gender:string;
}


interface ActionTableCellInterface
{
    TableName: string;
    Information: UserDataInterface | BookDataInterface;
    isAdmin: boolean
}

interface BookFilterInterface extends FilterInterface
{

}

interface UserFilterInterface extends FilterInterface
{
    
}

interface ConfirmInterface
{
    defaultData: BookDataInterface;
}

interface EditConfirmInterface extends ConfirmInterface
{
    editData: BookDataInterface;
}

export type {BookSearchInterface, BookDataInterface, UserDataInterface, ActionTableCellInterface, BookFilterInterface, UserFilterInterface, ConfirmInterface, EditConfirmInterface}