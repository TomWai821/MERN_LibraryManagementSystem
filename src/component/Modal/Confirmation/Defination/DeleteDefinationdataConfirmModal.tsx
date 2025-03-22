import { FC } from "react";
import { Box, Typography } from "@mui/material";

// Models
import { DeleteModalInterface } from "../../../../Model/ModelForModal";
import { DefinationInterface } from "../../../../Model/ResultModel";

// UI Fragment
import ModalTemplate from "../../../Templates/ModalTemplate";
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";
import DeleteTypography from "../../../UIFragment/DeleteTypography";

// Contexts
import { useDefinationContext } from "../../../../Context/Book/DefinationContext";
import { useModal } from "../../../../Context/ModalContext";

// Useful Object/Array Data
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

const DeleteDefinationConfirmModal:FC<DeleteModalInterface> = (deleteData) =>
{
    const {type, data} = deleteData;
    const {handleClose} = useModal();
    const { deleteDefination } = useDefinationContext();
    const Data = data as DefinationInterface;

    const setTitle = () => 
    {
        let setTitle = {title:"", subTitle:""};
        
        setTitle.title = `Delete ${type} Defination`;
        setTitle.subTitle = "Do you want to delete this defination?"
        return setTitle;
    }

    const DeleteDefinationAction = () => 
    {
        deleteDefination(type as string, deleteData._id);
        handleClose();
    }

    return( 
        <ModalTemplate title={setTitle().title} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{setTitle().subTitle}</Typography>
                {
                    Data.genre ? <Typography>Genre: {Data.genre}</Typography> : <Typography>Langauge: {Data.language}</Typography>
                }
                <Typography>Short Name: {Data.shortName}</Typography>
            </Box>
            
            <DeleteTypography/>
            <ModalConfirmButton clickEvent={DeleteDefinationAction} name={"Yes"} buttonType={"Important"}/>
        </ModalTemplate>
    );
}

export default DeleteDefinationConfirmModal