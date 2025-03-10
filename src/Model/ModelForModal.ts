import { BookDataInterface } from "./BookTableModel";
import { UserResultDataInterface } from "./ResultModel";

interface CreateModalInterface
{
    data?: UserResultDataInterface | BookDataInterface;
}

interface EditModalInterface
{
    value:number;
    editData: UserResultDataInterface | BookDataInterface;
    compareData: UserResultDataInterface | BookDataInterface;
}

interface BanModalInterface
{
    _id:string;
    username:string;
    durationOption?:number;
    description?:string;
}

interface DeleteModalInterface extends UserResultDataInterface
{
    _id:string;
    value:number;
}

interface DisplayDataModalInterface
{
    value:number;
    isAdmin:boolean;
    data:UserResultDataInterface;
}

interface ModalConfirmButtonInterface
{
    clickEvent:() => void;
    name:string;
    buttonType:string;
}

interface UserModalBody
{
    isAdmin?:boolean;
    data: UserResultDataInterface;
}

export type {CreateModalInterface, EditModalInterface, BanModalInterface, DeleteModalInterface, DisplayDataModalInterface, ModalConfirmButtonInterface, UserModalBody}