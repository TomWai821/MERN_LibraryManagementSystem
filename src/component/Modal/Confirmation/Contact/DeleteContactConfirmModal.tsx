import { FC } from "react"
import ModalTemplate from "../../../Templates/ModalTemplate"
import { useModal } from "../../../../Context/ModalContext";
import { DeleteModalInterface } from "../../../../Model/ModelForModal";
import { LoanBookInterface } from "../../../../Model/ResultModel";
import { Box, Typography } from "@mui/material";
import DeleteTypography from "../../../UIFragment/DeleteTypography";
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { useContactContext } from "../../../../Context/Book/ContactContext";

const DeleteContactConfirmModal:FC<DeleteModalInterface> = (deleteData) => 
{
    
    const {type, data} = deleteData;
    const {deleteContactData} = useContactContext();
    const {handleClose} = useModal();
    
    const setTitle = () => 
    {
        let setTitle = {title:"", subTitle:""};
        
        setTitle.title = `Delete ${type} Contact Data`;
        setTitle.subTitle = "Do you want to delete this defination?"
        return setTitle;
    }

    const DeleteDefinitionAction = () => 
    {
        deleteContactData(type as string, data._id);
        handleClose();
    }
    
    return(
        <ModalTemplate title={setTitle().title} width="400px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{setTitle().subTitle}</Typography>
                {
                    data.author ? <Typography>Author: {data.author}</Typography> : <Typography>Publisher: {data.publisher}</Typography>
                }
                <Typography>Phone No: {data.phoneNumber}</Typography>
                <Typography>Email: {data.email}</Typography>
                { type === "Publisher" && <Typography>Address: {data.address}</Typography>}
            </Box>
            
            <DeleteTypography/>
            <ModalConfirmButton clickEvent={DeleteDefinitionAction} name={"Yes"} buttonType={"Important"}/>
        </ModalTemplate>
    )
}

export default DeleteContactConfirmModal