import { FC, useEffect } from "react"
import { BookDataInterface, EditConfirmInterface } from "../../../../Model/TablePageModel"
import { Box, Button, Typography } from "@mui/material";
import { useModal } from "../../../../Context/ModalContext";
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import ModalTemplate from "../../../Templates/ModalTemplate";
import EditBookModal from "../../Book/EditBookModal";

const EditBookConfirmModal:FC<EditConfirmInterface> = ({editData, defaultData}) => 
{
    const { handleOpen} = useModal();
    const changes: Partial<BookDataInterface> = {};

    const backToEditModal = () => 
    {
        handleOpen(<EditBookModal name={editData?.name} genre={editData?.genre} author={editData?.author} publisher={editData?.publisher} pages={editData?.pages} amount={editData.amount}/>);
    }

    const CompareValue = () => 
    {
        for (const key in defaultData) 
        {
            if (defaultData[key as keyof BookDataInterface] !== editData[key as keyof BookDataInterface]) 
            {
                changes[key as keyof BookDataInterface] = editData[key as keyof BookDataInterface];
            }
        }
        console.log(changes)
        return changes;
    }
    
    const onClick = () => 
    {

    }

    useEffect(() => {CompareValue()});

    return(
        <ModalTemplate title={"Edit Book Record Confirmation"} cancelButtonName={"No"} cancelButtonEvent={backToEditModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to edit this book record?</Typography>
                {
                }
            </Box>
            <Button variant='contained' onClick={onClick}>Yes</Button>
        </ModalTemplate>

    );
}

export default EditBookConfirmModal