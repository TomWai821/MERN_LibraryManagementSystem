import { Box, Button, Typography } from "@mui/material"
import ModalTemplate from "../../../Templates/ModalTemplate"
import { ModalBodySyntax } from "../../../../Maps/FormatSyntaxMaps"
import { FC } from "react"
import { ConfirmInterface } from "../../../../Model/TablePageModel"
import { useModal } from "../../../../Context/ModalContext"
import CreateBookModal from "../../Book/CreateBookModal"

const CreateBookConfirmModal:FC<ConfirmInterface> = ({defaultData}) => 
{
    const {name, genre, publisher, author, pages, amount} = defaultData;

    const {handleOpen} = useModal();

    const backToCreateModal = () => 
    {
        handleOpen(<CreateBookModal name={name} genre={genre} author={author} publisher={publisher} pages={pages} amount={amount}/>);
    }

    return(
        <ModalTemplate title={"Create Book Confirmation"} cancelButtonName={"No"} cancelButtonEvent={() => backToCreateModal()}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography sx={ModalBodySyntax}>Do you want to create this book record?</Typography>
                <Typography>Name: {name}</Typography>
                <Typography>Genre: {genre}</Typography>
                <Typography>Publisher: {publisher}</Typography>
                <Typography>Author: {author}</Typography>
                <Typography>Pages: {pages}</Typography>
                <Typography>Amount: {amount}</Typography>
            <Typography>Remarks: Please ensure the information is correct</Typography>
            </Box>

            <Button variant="contained">Yes</Button>
        </ModalTemplate>
    )
}

export default CreateBookConfirmModal