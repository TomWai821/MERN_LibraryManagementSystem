import { FC, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";

import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/Style";
import ModalTemplate from "../../../Templates/ModalTemplate";


import { ReturnBookInterface } from "../../../../Model/ModelForModal";
import { LoanBookInterface } from "../../../../Model/ResultModel";

import { useBookContext } from "../../../../Context/Book/BookContext";
import { useModal } from "../../../../Context/ModalContext";
import { countLateReturn } from "../../../../Controller/OtherController";
import { AlertContext } from "../../../../Context/AlertContext";

const SubmitFinesConfirmModal:FC<ReturnBookInterface> = (returnBookModalData) => 
{
    const {data} = returnBookModalData;
    const {handleClose} = useModal();
    const {returnBook} = useBookContext();
    const alertContext = useContext(AlertContext);

    const Data = data as LoanBookInterface; 

    const submitFinesConfirm = async () => 
    {
        const response = returnBook(Data._id, data.fineAmount, "Paid");

        if (alertContext && alertContext.setAlertConfig) 
        {
            if (await response) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: "Change Submit Fine Status successfully!", open: true, onClose: () => alertContext.setAlertConfig(null) });
                setTimeout(() => { handleClose() }, 2000);
            } 
            else 
            {
                alertContext.setAlertConfig({ AlertType: "error", Message: "Failed to Change Submit Fine Status! Please try again later", open: true, onClose: () => alertContext.setAlertConfig(null) });
            }
        }
    }

    return(
        <ModalTemplate title={"Submit Fines Confirmation"}  width="400px" cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Does {Data.userDetails?.username} submit fines now?</Typography>
                <Typography>Fines Per Day: HKD$1.5</Typography>
                <Typography>OverDue: {countLateReturn(Data.dueDate as string , data.returnDate as string)} days</Typography>
                <Typography>Total: HKD${Data.fineAmount} </Typography>
            </Box>
            <Button variant='contained' onClick={submitFinesConfirm}>Yes</Button>
        </ModalTemplate>
    )
}

export default SubmitFinesConfirmModal