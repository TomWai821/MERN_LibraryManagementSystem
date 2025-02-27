import { UserDataInterface } from "./TablePageModel";

interface ResultInterface
{
    data: RegisterDataInterface;
}

interface RegisterDataInterface
{
    authToken: string;
    username: string;
    role: string;
}

interface GetResultInterface
{
    success:boolean;
    foundUser: UserDataInterface;
}

interface GetUserResultInterface
{
    success:boolean;
    foundUser: UserDataInterface[];
}

export type {ResultInterface, GetResultInterface, GetUserResultInterface}