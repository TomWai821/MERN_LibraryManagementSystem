import { FC } from "react"
import { Box, Button, Typography } from "@mui/material"

// Template
import ModalTemplate from "../../../Templates/ModalTemplate"

// Context
import { useModal } from "../../../../Context/ModalContext"

// Model
import { BookDataInterface } from "../../../../Model/BookTableModel"

// Another Modal
import CreateBookModal from "../../Book/CreateBookModal"
import { CreateModalInterface } from "../../../../Model/ModelForModal"

// Data(CSS Syntax)
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps"

const CreateBookConfirmModal:FC<CreateModalInterface> = ({...bookData}) => 
{
    const {bookname, genre, publisher, author, pages, amount} = bookData as BookDataInterface;

    const {handleOpen} = useModal();

    const backToCreateModal = () => 
    {
        handleOpen(<CreateBookModal data={bookData as BookDataInterface} />);
    }

    return(
        <ModalTemplate title={"Create Book Confirmation"} cancelButtonName={"No"} cancelButtonEvent={() => backToCreateModal()}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography sx={ModalSubTitleSyntax}>Do you want to create this book record?</Typography>
                <Typography>Name: {bookname}</Typography>
                <Typography>Genre: {genre}</Typography>
                <Typography>Publisher: {publisher}</Typography>
                <Typography>Author: {author}</Typography>
                <Typography>Pages: {pages}</Typography>
                <Typography>Amount: {amount}</Typography>
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>

            <Button variant="contained">Yes</Button>
        </ModalTemplate>
    )
}

export default CreateBookConfirmModal