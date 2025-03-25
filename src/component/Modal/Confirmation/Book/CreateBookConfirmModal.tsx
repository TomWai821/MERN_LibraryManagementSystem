import { FC } from "react"
import { Avatar, Box, Button, Typography } from "@mui/material"

// Template
import ModalTemplate from "../../../Templates/ModalTemplate"

// Context
import { useModal } from "../../../../Context/ModalContext"

// Another Modal
import CreateBookModal from "../../Book/CreateBookModal"
import { CreateModalInterface } from "../../../../Model/ModelForModal"

// Data(CSS Syntax)
import { useBookContext } from "../../../../Context/Book/BookContext"
import { BookDescriptionDisplayFormat, BookImageFormat, displayAsColumn, displayAsRow, ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects"

const CreateBookConfirmModal:FC<CreateModalInterface> = ({...bookData}) => 
{
    const { image, imageURL, bookname, genre, genreID, language, languageID, author, authorID, publisher, publisherID, description} = bookData.data;
    
    const { handleOpen, handleClose } = useModal();
    const { createBook } = useBookContext();

    const backToCreateModal = () => 
    {
        handleOpen(
        <CreateBookModal image={image} imageURL={imageURL} bookname={bookname} 
            language={language} languageID={languageID} genre={genre} genreID={genreID} 
            author={author} authorID={authorID} publisher={publisher} publisherID={publisherID}
            description={description} />
        );
    }

    const CreateBook = () => 
    {
        createBook(image, bookname, genreID, languageID, description);
        handleClose();
    }

    const width = image ? '600px': '400px';

    return(
        <ModalTemplate title={"Create Book Confirmation"} width={width} cancelButtonName={"No"} cancelButtonEvent={() => backToCreateModal()}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to create this book record?</Typography>
                <Box sx={displayAsRow}>
                    {imageURL &&
                        (
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                <Avatar src={imageURL} alt="Preview" variant="rounded" sx={BookImageFormat}/>
                            </Box>
                        )
                    } 

                    <Box sx={{...displayAsColumn, margin: '10px 0 0 20px', gap:"20px 50px"}}>
                        {!imageURL && <Typography>Image: N/A</Typography>}
                        <Typography>BookName: {bookname}</Typography>
                        <Typography>Language: {language}</Typography>
                        <Typography>Genre: {genre}</Typography>
                        <Box sx={{ maxWidth: '350px', display: 'inline-block'}}>
                            <Typography>Description:</Typography>
                            <Typography sx={BookDescriptionDisplayFormat}>{description}</Typography>
                        </Box>
                    </Box>

                </Box>
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>

            <Button variant="contained" onClick={CreateBook}>Yes</Button>
        </ModalTemplate>
    )
}

export default CreateBookConfirmModal