import { FC } from 'react'

import { Box, Button,  Typography} from '@mui/material';
import { BookDataInterface } from '../../../../Model/TablePageModel';
import { DeleteButton, ModalBodySyntax, ModalSubTitleSyntax } from '../../../../Maps/FormatSyntaxMaps';

import ModalTemplate from '../../../Templates/ModalTemplate';
import DeleteTypography from '../../../UIFragment/Typography/DeleteTypography';

const DeleteBookModal:FC<BookDataInterface> = ({...bookData}) => 
{  
    const { bookname, genre, publisher, author, pages, amount } = bookData;

    const onClick = () => 
    {

    }
        
    return(
        <ModalTemplate title={"Delete Book Record Confirmation"} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to delete this book record?</Typography>
                <Typography>Book Name:{bookname}</Typography>
                <Typography>Book Genre:{genre}</Typography>
                <Typography>Publisher Name:{publisher}</Typography>
                <Typography>Author Name:{author}</Typography>
                <Typography>Number of Pages:{pages}</Typography>
                <Typography>Current amount:{amount}</Typography>
            </Box>

            <DeleteTypography/>
            <Button variant='contained' sx={{...DeleteButton}} onClick={onClick}>Yes</Button>
              
        </ModalTemplate>
    );
}

export default DeleteBookModal;