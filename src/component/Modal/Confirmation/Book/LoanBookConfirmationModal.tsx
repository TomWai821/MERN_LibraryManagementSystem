import { Avatar, Box, Button, Typography } from "@mui/material";
import ModalTemplate from "../../../Templates/ModalTemplate";
import { BookDescriptionDisplayFormat, BookImageFormat, displayAsColumn, displayAsRow, ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { FC } from "react";
import { useBookContext } from "../../../../Context/Book/BookContext";
import { LoanBookModalInterface } from "../../../../Model/ModelForModal";
import { useModal } from "../../../../Context/ModalContext";

const LoanBookConfirmationModal:FC<LoanBookModalInterface> = (LoanBookData) => 
{
    const {_id, bookname, language, genre, description, imageUrl} = LoanBookData;
    const {loanBook} = useBookContext();
    const {handleClose} = useModal();

    const ConfirmtLoanBook = () => 
    {
        loanBook(_id);
        handleClose();
    }

    const bookData = 
    [
        {label: "Bookname", value: bookname},
        {label: "Language", value: language},
        {label: "Genre", value: genre},
        {label: "Description", value: description}
    ]

    return(
        <ModalTemplate title={"Loan Book Record Confirmation"} width="600px" cancelButtonName="No">
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to loan this book?</Typography>

                <Box sx={displayAsRow}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Avatar src={imageUrl} alt="Preview" variant="rounded" sx={BookImageFormat}/>
                    </Box>

                    <Box sx={{...displayAsColumn, margin: '10px 0 0 20px', gap:"20px 50px"}}>
                        {
                            bookData.map((data, index) => 
                                (
                                    <Box key={index} sx={{display: "inline-block"}}>
                                        <Typography>{data.label}</Typography>
                                        <Typography sx={BookDescriptionDisplayFormat}>{data.value}</Typography>
                                    </Box>
                                )
                            )
                        }

                    </Box>
                </Box>

            </Box>
            <Button variant='contained' onClick={ConfirmtLoanBook}>Yes</Button>
        </ModalTemplate>
    )
}

export default LoanBookConfirmationModal