import { Box, Button, Typography } from "@mui/material"
import ModalTemplate from "../../../Templates/ModalTemplate"
import { DeleteButton, ModalBodySyntax } from "../../../../Maps/FormatSyntaxMaps"
import { FC } from "react"
import { ConfirmInterface } from "../../../../Model/TablePageModel"

const CreateBookConfirmModal:FC<ConfirmInterface> = ({defaultData}) => 
{
    const {name, genre, publisher, author, pages, amount} = defaultData;

    return(
        <ModalTemplate title={"Create Book Confirmation"} CancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography>Do you want to create this book record?</Typography>
                <Typography>Name: {name}</Typography>
                <Typography>Genre: {genre}</Typography>
                <Typography>Publisher: {publisher}</Typography>
                <Typography>Author: {author}</Typography>
                <Typography>Pages: {pages}</Typography>
                <Typography>Amount: {amount}</Typography>
            </Box>

            <Button variant="contained">Yes</Button>
        </ModalTemplate>
    )
}

export default CreateBookConfirmModal