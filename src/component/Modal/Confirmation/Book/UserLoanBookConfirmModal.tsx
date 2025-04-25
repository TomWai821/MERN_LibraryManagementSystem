import { FC, useState } from "react";
import { Avatar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import ModalTemplate from "../../../Templates/ModalTemplate";

import { BookDescriptionDisplayFormat, BookImageFormat, displayAsColumn, displayAsRow, ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

import { useBookContext } from "../../../../Context/Book/BookContext";
import { useModal } from "../../../../Context/ModalContext";

import { QRCodeInterface, UserLoanBookModalBodyInterface } from "../../../../Model/ModelForModal";

import LoanBookConfirmationModal from "./LoanBookConfirmationModal";


const UserLoanBookConfirmationModal:FC<UserLoanBookModalBodyInterface> = (LoanBookData) => 
{
    const {qrCodeData, _id, bookname, author, language, genre, description, imageUrl} = LoanBookData;
    const {loanBook} = useBookContext();
    const {handleOpen, handleClose} = useModal();

    const ConfirmLoanBook = () => 
    {
        loanBook(_id, handleScanData().authToken);
        handleClose();
    }

    const handleScanData = () =>
    {
        if(!qrCodeData)
        {
            return {username: "", authToken: ""};
        }

        const parseData = JSON.parse(qrCodeData) as QRCodeInterface;
        return {username: parseData.username, authToken: parseData.authToken}
    }

    const returnUserLoanBookModal = () => 
    {
        handleOpen(<LoanBookConfirmationModal qrCodeData={qrCodeData} _id={_id} bookname={bookname} author={author} language={language}
        genre={genre} description={description} imageUrl={imageUrl} tabValue={1} />);
    }

    const bookData = 
    [
        {label: "Username", value: handleScanData().username},
        {label: "Bookname", value: bookname},
        {label: "Author", value: author},
        {label: "Language", value: language},
        {label: "Genre", value: genre}
    ]
    
    return(
        <ModalTemplate title={"Loan Book Modal"} width="600px" cancelButtonName={"No"} cancelButtonEvent={() => returnUserLoanBookModal()}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Loan Book Confirmation</Typography>
                    <Box sx={displayAsRow}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Avatar src={imageUrl} alt="Preview" variant="rounded" sx={BookImageFormat}/>
                        </Box>

                        <Box sx={{...displayAsColumn, margin: '10px 0 0 20px', gap:"20px 50px"}}>
                        {
                            bookData.map((data, index) => 
                                (
                                    <Typography key={index}>{data.label}: {data.value}</Typography>
                                )
                            )
                        }
                        <Box sx={{display: "inline-block"}}>
                            <Typography>Description</Typography>
                            <Typography sx={BookDescriptionDisplayFormat}>{description}</Typography>
                        </Box>
                     </Box>
                 </Box>
            </Box>
            <Button variant='contained' onClick={ConfirmLoanBook}>Yes</Button>
        </ModalTemplate>
    )
}

export default UserLoanBookConfirmationModal