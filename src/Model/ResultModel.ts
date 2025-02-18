import { UserDataInterface } from "./TablePageModel";

interface ResultInterface
{
    authToken: string;
    name: string;
    role: string;
}

interface GetResultInterface
{
    success:boolean;
    foundUser: UserDataInterface;
}

export type {ResultInterface, GetResultInterface}