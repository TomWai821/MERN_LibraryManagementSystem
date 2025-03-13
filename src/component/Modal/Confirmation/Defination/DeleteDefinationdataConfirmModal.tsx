import { FC } from "react";
import { DeleteModalInterface } from "../../../../Model/ModelForModal";
import { DefinationInterface } from "../../../../Model/ResultModel";
import ModalTemplate from "../../../Templates/ModalTemplate";
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";
import DeleteTypography from "../../../UIFragment/DeleteTypography";
import { Box, Typography } from "@mui/material";
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import { useDefinationContext } from "../../../../Context/Book/DefinationContext";

const DeleteDefinationConfirmModal:FC<DeleteModalInterface> = (deleteData) =>
{
    const {value, data} = deleteData;
    const { deleteDefination } = useDefinationContext();
    const Data = data as DefinationInterface;
    const type = value === 0 ? "Genre" : "Language";

    const setTitle = () => 
    {
        let setTitle = {title:"", subTitle:""};
        
        setTitle.title = `Delete ${type} Defination`;
        setTitle.subTitle = "Do you want to delete this defination?"
        return setTitle;
    }

    const DeleteDefinationAction = () => 
    {
        deleteDefination(type, deleteData._id);
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