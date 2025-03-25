import { FC } from "react";
import { Box, Typography } from "@mui/material";

// Models
import { DeleteModalInterface } from "../../../../Model/ModelForModal";
import { DefinitionInterface } from "../../../../Model/ResultModel";

// UI Fragment
import ModalTemplate from "../../../Templates/ModalTemplate";
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";
import DeleteTypography from "../../../UIFragment/DeleteTypography";

// Contexts
import { useDefinitionContext } from "../../../../Context/Book/DefinitionContext";
import { useModal } from "../../../../Context/ModalContext";

// Useful Object/Array Data
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

const DeleteDefinitionConfirmModal:FC<DeleteModalInterface> = (deleteData) =>
{
    const {type, data} = deleteData;
    const {handleClose} = useModal();
    const { deleteDefinition } = useDefinitionContext();
    const Data = data as DefinitionInterface;

    const setTitle = () => 
    {
        let setTitle = {title:"", subTitle:""};
        
        setTitle.title = `Delete ${type} Definition`;
        setTitle.subTitle = "Do you want to delete this defination?"
        return setTitle;
    }

    const DeleteDefinitionAction = () => 
    {
        deleteDefinition(type as string, deleteData._id);
        handleClose();
    }

    return( 
        <ModalTemplate title={setTitle().title} width="400px"  cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{setTitle().subTitle}</Typography>
                {
                    Data.genre ? <Typography>Genre: {Data.genre}</Typography> : <Typography>Langauge: {Data.language}</Typography>
                }
                <Typography>Short Name: {Data.shortName}</Typography>
            </Box>
            
            <DeleteTypography/>
            <ModalConfirmButton clickEvent={DeleteDefinitionAction} name={"Yes"} buttonType={"Important"}/>
        </ModalTemplate>
    );
}

export default DeleteDefinitionConfirmModal