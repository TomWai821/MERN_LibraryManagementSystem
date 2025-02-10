import { FC, useState } from 'react'

import { Box, TextField, Typography, InputLabel, Modal, Button } from '@mui/material';
import { useModal } from '../../../Context/ModalContext';
import { BookDataInterface } from '../../../Model/TablePageModel';
import { CreateModalSyntax, ModalBodySyntax, ModalSyntax, ModalTitleSyntax } from '../../../Model/UIRenderingModel/FormatSyntaxModel';
import { BookSearchFields } from '../../../Model/UIRenderingModel/TextFieldsModel';

const EditBookModal:FC<BookDataInterface> = ({name, genre, publisher, author, pages}) => 
{
    const {open, handleClose} = useModal();
    const [book, setBook] = useState({name: name, genre: genre, publisher: publisher, author: author, pages: pages});

    const onChange = () => 
    {

    }

    return(
        <Modal open={open} onClose={handleClose} >
        <Box sx={{...ModalSyntax, ...CreateModalSyntax}}>
            <Typography id="modal-title" sx={ModalTitleSyntax}>Edit Book Record</Typography>

            <Box id="modal-description" sx={ModalBodySyntax}>
            {
                BookSearchFields.map((field, index) => 
                (
                    <TextField key={index} label={field.label} name={field.name} value={book[field.name as keyof BookDataInterface]} 
                        type={field.type} size="small" onChange={onChange} select={field.select} slotProps={field.slotProps} />
                ))
            }
            </Box>
            <Button variant='contained' sx={{marginRight: '10px'}}>Edit</Button>
            <Button onClick={handleClose}>Exit</Button>
        </Box>
    </Modal>
    );
}

export default EditBookModal;