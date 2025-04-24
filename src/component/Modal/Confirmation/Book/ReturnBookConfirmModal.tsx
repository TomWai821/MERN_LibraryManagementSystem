import { ChangeEvent, FC, Fragment, useState } from "react";
import { Avatar, Box, Button, MenuItem, TextField, Typography } from "@mui/material";

import { BookImageFormat, displayAsRow, ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import ModalTemplate from "../../../Templates/ModalTemplate";


import { ReturnBookInterface } from "../../../../Model/ModelForModal";
import { calculateFineAmount, countLateReturn, TransferDateToISOString } from "../../../../Controller/OtherController";
import { LoanBookInterface } from "../../../../Model/ResultModel";

import { useBookContext } from "../../../../Context/Book/BookContext";
import { useModal } from "../../../../Context/ModalContext";

const ReturnBookConfirmModal:FC<ReturnBookInterface> = (returnBookModalData) => 
{
    const {modalOpenPosition, data, isAdmin} = returnBookModalData;
    const {handleClose} = useModal();
    const {returnBook} = useBookContext();

    const [finesPaid, setFinesPaid] = useState<string>("Not Paid");

    const Data = data as LoanBookInterface; 

    const ReturnBook = () => 
    {
        countLateReturn(Data.dueDate as string, "number") as number > 0 ?  returnBook(data._id, calculateFineAmount(Data.dueDate as string), finesPaid) : returnBook(Data._id);
        handleClose();
    }

    const modifyFinesPaid = (event:ChangeEvent<HTMLInputElement>) => 
    {
        const {value} = event.target;
        setFinesPaid(value);
    }

    const setTitle = () => 
    {
        return (modalOpenPosition === "AdminTableCell" && isAdmin) ? `Loan Book Record for ${Data.userDetails?.username}` : "Do you want to return this book?";
    }

    const ReturnBookData = 
    [
        {label: "Bookname", value: Data.bookDetails?.bookname},
        {label: "Loan Date", value: TransferDateToISOString(Data.loanDate as Date)},
        {label: "Due Date", value: TransferDateToISOString(Data.dueDate as Date)},
        {label: "Overdue", value: countLateReturn(Data.dueDate as string, "string")},
    ]

    return(
        <ModalTemplate title={"Return Book Confirmation"}  width="600px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{setTitle()}</Typography>

                <Box sx={{...displayAsRow, justifyContent: 'space-between'}}>
                    <Avatar src={Data.bookDetails?.image?.url} alt="Preview" variant="rounded" sx={BookImageFormat}/>

                    <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                        {
                            ReturnBookData.map((data, index) => 
                                (
                                    <Typography key={index}>{data.label}: {data.value}</Typography>
                                )
                            )
                        }

                        {
                            countLateReturn(Data.dueDate as string, "number") as number > 0 &&
                            <Fragment>
                                <Typography>{`Fine Amount: HKD$${calculateFineAmount(Data.dueDate as string)}`}</Typography>

                                <Box sx={{...displayAsRow, alignItems: 'center'}}>
                                    <Typography sx={{paddingRight: '10px'}}>Fine Paid:</Typography>
                                    <TextField size="small" name={finesPaid} value={finesPaid} onChange={modifyFinesPaid} select>
                                        <MenuItem value={"Not Paid"}>Not Paid</MenuItem>
                                        <MenuItem value={"Paid"}>Paid</MenuItem>
                                    </TextField>
                                </Box>
                            </Fragment>
                        }
                    </Box>
                </Box>

            </Box>
            <Button variant='contained' onClick={() => ReturnBook()}>Return</Button>
        </ModalTemplate>
    )
}

export default ReturnBookConfirmModal