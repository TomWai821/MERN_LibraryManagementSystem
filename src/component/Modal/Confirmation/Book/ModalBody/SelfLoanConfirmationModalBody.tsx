import { Avatar, Box, Button, Typography } from "@mui/material"
import { BookDescriptionDisplayFormat, BookImageFormat, displayAsColumn, displayAsRow } from "../../../../../ArraysAndObjects/FormatSyntaxObjects"
import { FC } from "react"
import { LoanBookModalInterface } from "../../../../../Model/ModelForModal"

import { useBookContext } from "../../../../../Context/Book/BookContext"
import { useModal } from "../../../../../Context/ModalContext"

const SelfLoanConfirmationModalBody:FC<LoanBookModalInterface> = (SelfLoanBookData) => 
{
    const {_id, bookname, author, language, genre, description, imageUrl} = SelfLoanBookData;
    const {loanBook} = useBookContext();
    const {handleClose} = useModal();

    const bookData = 
    [
        {label: "Bookname", value: bookname},
        {label: "Author", value: author},
        {label: "Language", value: language},
        {label: "Genre", value: genre}
    ]

    return(
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
    )
}

export default SelfLoanConfirmationModalBody