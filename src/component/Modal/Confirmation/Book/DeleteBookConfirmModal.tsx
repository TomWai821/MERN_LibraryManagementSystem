import { FC } from 'react'
import { Box, Button,  Typography} from '@mui/material';

// Template
import ModalTemplate from '../../../Templates/ModalTemplate';
import DeleteTypography from '../../../UIFragment/DeleteTypography';

// Model
import { BookDataInterfaceForDelete } from '../../../../Model/BookTableModel';

// Data (CSS Syntax)
import { useBookContext } from '../../../../Context/Book/BookContext';
import { useModal } from '../../../../Context/ModalContext';
import { DeleteButton, ModalBodySyntax, ModalSubTitleSyntax } from '../../../../ArraysAndObjects/FormatSyntaxObjects';

const DeleteBookModal:FC<BookDataInterfaceForDelete> = ({...bookData}) => 
{  
    const { bookID, bookname, language, genre, author, publisher } = bookData;
    const {deleteBook} = useBookContext();
    const {handleClose} = useModal();

    const DeleteBook = () => 
    {
        deleteBook(bookID);
        handleClose();
    }
        
    return(
        <ModalTemplate title={"Delete Book Record Confirmation"} width="400px" cancelButtonName="No">
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to delete this book record?</Typography>
                <Typography>Name: {bookname}</Typography>
                <Typography>Language: {language}</Typography>
                <Typography>Genre: {genre}</Typography>
                <Typography>Author: {author}</Typography>
                <Typography>Publisher: {publisher}</Typography>
            </Box>

            <DeleteTypography/>
            <Button variant='contained' sx={{...DeleteButton}} onClick={DeleteBook}>Yes</Button>
              
        </ModalTemplate>
    );
}

export default DeleteBookModal;