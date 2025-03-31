import { FC } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";

import { BookImageFormat, displayAsRow, ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import ModalTemplate from "../../../Templates/ModalTemplate";
import { useBookContext } from "../../../../Context/Book/BookContext";
import { useModal } from "../../../../Context/ModalContext";
import { ReturnBookInterface } from "../../../../Model/ModelForModal";
import { countLateReturn, TransferDateToISOString } from "../../../../Controller/OtherController";
import { LoanBookInterface } from "../../../../Model/ResultModel";

const ReturnBookConfirmModal:FC<ReturnBookInterface> = (returnBookModalData) => 
{

    const {modalOpenPosition, data, isAdmin} = returnBookModalData;
    const {handleClose} = useModal();
    const {returnBook} = useBookContext();

    const Data = data as LoanBookInterface; 

    const ReturnBook = () => 
    {
        returnBook(Data._id);
        handleClose();
    }

    const setTitle = () => 
    {
        return (modalOpenPosition === "AdminTableCell" && isAdmin) ? `Loan Book Record for ${Data.userDetails?.username}` : "Do you want to return this book?";
    }

    return(
        <ModalTemplate title={"Return Book Confirmation"}  width="600px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{setTitle()}</Typography>

                <Box sx={{...displayAsRow, justifyContent: 'space-between'}}>
                    <Avatar src={Data.bookDetails?.image?.url} alt="Preview" variant="rounded" sx={BookImageFormat}/>

                    <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                        <Box sx={{ display: 'inline-block'}}>
                            <Typography>Bookname:</Typography>
                            <Typography>{Data.bookDetails?.bookname}</Typography>
                        </Box>
                        <Typography>Loan Date: {TransferDateToISOString(Data.loanDate as Date)}</Typography>
                        <Typography>Due Date: {TransferDateToISOString(Data.dueDate as Date)}</Typography>
                        <Typography>Late Return: {countLateReturn(Data.dueDate as string)}</Typography>
                    </Box>
                </Box>

            </Box>
            <Button variant='contained' onClick={() => ReturnBook()}>Return</Button>
        </ModalTemplate>
    )
}

export default ReturnBookConfirmModal