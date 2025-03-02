interface LoginInterface
{
    email:string;
    password:string;
}

interface CreateUserInterface extends LoginInterface
{
    username: string;
    gender: string;
    role: string;
    birthDay: string;
    status: string;
}

interface ModifyUserDataInterface
{
    username: string;
    email: string;
    gender: string;
    role: string;
    status: string;
    description: string;
    startDate: Date;
    dueDate: Date;
}

export type {LoginInterface, CreateUserInterface, ModifyUserDataInterface}
