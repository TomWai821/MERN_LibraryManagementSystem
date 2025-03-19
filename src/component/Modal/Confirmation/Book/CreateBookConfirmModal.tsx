import { FC } from "react"
import { Box, Button, Typography } from "@mui/material"

// Template
import ModalTemplate from "../../../Templates/ModalTemplate"

// Context
import { useModal } from "../../../../Context/ModalContext"

// Another Modal
import CreateBookModal from "../../Book/CreateBookModal"
import { CreateModalInterface } from "../../../../Model/ModelForModal"

// Data(CSS Syntax)
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps"
import { useBookContext } from "../../../../Context/Book/BookContext"

const CreateBookConfirmModal:FC<CreateModalInterface> = ({...bookData}) => 
{
    const {bookname, genre, genreID, language, languageID, pages, description} = bookData.data;
    
    const { handleOpen, handleClose } = useModal();
    const { createBook } = useBookContext();

    const backToCreateModal = () => 
    {
        handleOpen(<CreateBookModal bookname={bookname} language={language} languageID={languageID} genre={genre} genreID={genreID} pages={pages} description={description}  />);
    }

    const CreateBook = () => 
    {
        createBook(bookname, genreID, languageID, pages, description);
        handleClose();
    }

    return(
        <ModalTemplate title={"Create Book Confirmation"} cancelButtonName={"No"} cancelButtonEvent={() => backToCreateModal()}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography sx={ModalSubTitleSyntax}>Do you want to create this book record?</Typography>
                <Typography>BookName: {bookname}</Typography>
                <Typography>Language: {language}</Typography>
                <Typography>Genre: {genre}</Typography>
                <Typography>Pages: {pages}</Typography>
                <Typography>Description: {description}</Typography>
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>

            <Button variant="contained" onClick={CreateBook}>Yes</Button>
        </ModalTemplate>
    )
}

export default CreateBookConfirmModal