import { FC, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { displayAsRow, ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import ModalTemplate from "../../../Templates/ModalTemplate";


import { ReturnBookInterface } from "../../../../Model/ModelForModal";
import { LoanBookInterface } from "../../../../Model/ResultModel";

import { useBookContext } from "../../../../Context/Book/BookContext";
import { useModal } from "../../../../Context/ModalContext";
import { countLateReturn } from "../../../../Controller/OtherController";

const SubmitFinesConfirmModal:FC<ReturnBookInterface> = (returnBookModalData) => 
{
    const {data} = returnBookModalData;
    const {handleClose} = useModal();
    const {returnBook} = useBookContext();

    const Data = data as LoanBookInterface; 

    const submitFinesConfirm = () => 
    {
        returnBook(Data._id, data.fineAmount, "Paid");
        handleClose();
    }

    return(
        <ModalTemplate title={"Submit Fines Confirmation"}  width="400px" cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Does {Data.userDetails?.username} submit fines now?</Typography>
                <Typography>Fines Per Day: HKD$1.5</Typography>
                <Typography>OverDue: {countLateReturn(Data.dueDate as string, "string")}</Typography>
                <Typography>Total: HKD${Data.fineAmount} </Typography>
            </Box>
            <Button variant='contained' onClick={submitFinesConfirm}>Yes</Button>
        </ModalTemplate>
    )
}

export default SubmitFinesConfirmModal