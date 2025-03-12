import { FC } from "react";
import { DeleteModalInterface } from "../../../../Model/ModelForModal";
import { DefinationInterface } from "../../../../Model/ResultModel";

const DeleteDefinationConfirmModal:FC<DeleteModalInterface> = (deleteData) =>
{
    const {data} = deleteData;
    const Data = data as DefinationInterface;

    return(<></>);
}

export default DeleteDefinationConfirmModal