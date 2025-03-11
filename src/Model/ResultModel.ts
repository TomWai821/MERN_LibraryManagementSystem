import { UserDataInterface } from "./UserTableModel";


interface ResultInterface
{
    data: RegisterDataInterface;
}

interface RegisterDataInterface
{
    authToken: string;
    username: string;
    role: string;
    avatarUrl:string;
    status: string;
}

interface GetResultInterface
{
    success:boolean;
    authtoken?:string;
    foundUser: UserResultDataInterface | UserResultDataInterface[];
}

interface UserResultDataInterface extends UserDataInterface
{
    _id:string;
    avatarUrl?:string;
    bannedDetails?: DetailsInterfaceForBannedAndDelete;
    deleteDetails?: DetailsInterfaceForBannedAndDelete;
}

interface DetailsInterfaceForBannedAndDelete
{
    _id:string;
    userID:string;
    description:string;
    startDate: Date | string;
    dueDate: Date | string;
    status:string;
}

export type {ResultInterface, GetResultInterface, UserResultDataInterface, DetailsInterfaceForBannedAndDelete}