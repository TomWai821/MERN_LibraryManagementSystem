import { FC } from 'react'

import { Box, Button, Modal, Typography} from '@mui/material';
import { useModal } from '../../../Context/ModalContext';
import { BookDataInterface } from '../../../Model/TablePageModel';
import { CreateModalSyntax, ModalSyntax } from '../../../Model/UIRenderingModel/FormatSyntaxModel';

const DeleteBookModal:FC<BookDataInterface> = ({name, genre, publisher, author, pages}) => 
{   
    const {open, handleClose} = useModal();

    return(
        <Modal open={open} onClose={handleClose} >
            <Box sx={{...ModalSyntax, ...CreateModalSyntax}}>
                <Box>
                    <Typography>Delete Book Record</Typography>

                    <Box>
                        <Typography>Book Name:{name}</Typography>
                        <Typography>Book Genre:{genre}</Typography>
                        <Typography>Publisher Name:{publisher}</Typography>
                        <Typography>Author Name:{author}</Typography>
                        <Typography>Number of Pages:{pages}</Typography>                       
                    </Box>

                    <Button>Delete</Button>
                    <Button onClick={handleClose}>Exit</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteBookModal;