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
    foundUser: UserResultDataInterface | UserResultDataInterface[];
}

interface UserResultDataInterface extends UserDataInterface
{
    _id:string;
}

export type {ResultInterface, GetResultInterface, UserResultDataInterface}