import { FC } from 'react'

import { Box, Button,  Typography} from '@mui/material';
import { BookDataInterface } from '../../../../Model/TablePageModel';
import { DeleteButton, ModalBodySyntax } from '../../../../Maps/FormatSyntaxMaps';
import DeleteTypography from '../../DeleteTypography';
import ModalTemplate from '../../../Templates/ModalTemplate';

const DeleteBookModal:FC<BookDataInterface> = ({...defaultData}) => 
{   
    const { name, genre, publisher, author, pages, amount } = defaultData;

    const onClick = () => 
    {

    }
        
    return(
        <ModalTemplate title={"Delete Book Record Confirmation"} CancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography>Do you want to delete this account?</Typography>
                <Typography>Book Name:{name}</Typography>
                <Typography>Book Genre:{genre}</Typography>
                <Typography>Publisher Name:{publisher}</Typography>
                <Typography>Author Name:{author}</Typography>
                <Typography>Number of Pages:{pages}</Typography>
                <Typography>Current amount:{amount}</Typography>
            </Box>

            <DeleteTypography/>
            <Button variant='contained' sx={{...DeleteButton}} onClick={onClick}>Delete</Button>    
        </ModalTemplate>
    );
}

export default DeleteBookModal;