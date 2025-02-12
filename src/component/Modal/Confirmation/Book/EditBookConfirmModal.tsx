import { FC } from "react"
import { ConfirmInterface } from "../../../../Model/TablePageModel"
import { Box, Button, Typography } from "@mui/material";
import { useModal } from "../../../../Context/ModalContext";
import { ModalBodySyntax } from "../../../../Maps/FormatSyntaxMaps";
import ModalTemplate from "../../../Templates/ModalTemplate";

const EditBookConfirmModal:FC<ConfirmInterface> = ({editData, defaultData}) => 
{
    const {open, handleClose} = useModal();
    
    const onClick = () => 
    {

    }

    return(
        <ModalTemplate title={"Edit Book Record Confirmation"} CancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography>Do you want to edit this book record?</Typography>
            </Box>
            <Button variant='contained' onClick={onClick}>Yes</Button>
        </ModalTemplate>

    );
}

export default EditBookConfirmModal