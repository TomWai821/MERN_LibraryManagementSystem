import { Box, Button, Typography } from "@mui/material"
import ModalTemplate from "../../../Templates/ModalTemplate"
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps"
import { FC } from "react"
import { BookDataInterface, CreateModalInterface } from "../../../../Model/TablePageModel"
import { useModal } from "../../../../Context/ModalContext"
import CreateBookModal from "../../Book/CreateBookModal"

const CreateBookConfirmModal:FC<CreateModalInterface> = ({bookData}) => 
{
    const {bookname, genre, publisher, author, pages, amount} = bookData as BookDataInterface;

    const {handleOpen} = useModal();

    const backToCreateModal = () => 
    {
        handleOpen(<CreateBookModal bookData={bookData} />);
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