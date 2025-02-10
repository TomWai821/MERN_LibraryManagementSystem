interface FilterInterface
{
    isAdmin:boolean;
}

interface BookDataInterface
{
    name:string;
    genre:string;
    author:string;
    publisher:string;
    pages:string;
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

export type {BookDataInterface, UserDataInterface, ActionTableCellInterface, BookFilterInterface, UserFilterInterface}