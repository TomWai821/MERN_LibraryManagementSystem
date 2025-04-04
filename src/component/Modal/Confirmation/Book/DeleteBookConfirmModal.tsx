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

    const fieldData = 
    [   
        {label:"BookName", data: bookname},
        {label:"Language", data: language},
        {label:"Genre", data: genre},
        {label:"Author", data: author},
        {label:"Publisher", data: publisher},
    ]
        
    return(
        <ModalTemplate title={"Delete Book Record Confirmation"} width="400px" cancelButtonName="No">
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to delete this book record?</Typography>
                {
                    fieldData.map((field, index) => 
                        (
                            <Typography key={index}>{field.label}: {field.data}</Typography>
                        )
                    )
                }
            </Box>

            <DeleteTypography/>
            <Button variant='contained' sx={{...DeleteButton}} onClick={DeleteBook}>Yes</Button>
              
        </ModalTemplate>
    );
}

export default DeleteBookModal;