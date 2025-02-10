import { ChangeEvent, FC, useState } from 'react'


import { Box, TextField, Typography, Modal, Button } from '@mui/material';

import { CreateModalSyntax, ModalBodySyntax, ModalSyntax, ModalTitleSyntax } from '../../../Model/UIRenderingModel/FormatSyntaxModel';
import { BookSearchFields } from '../../../Model/UIRenderingModel/TextFieldsModel';
import { BookDataInterface } from '../../../Model/TablePageModel';

import { useModal } from '../../../Context/ModalContext';

const CreateBookModal:FC = ({}) => 
{
    const [book, setBook] = useState({name: "", genre: "", publisher: "", author: "", pages: ""});
    const {open, handleClose} = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setBook({...book, [event.target.name]: event.target.value});
    }

    return(
        <Modal open={open} onClose={handleClose} >
            <Box sx={{...ModalSyntax, ...CreateModalSyntax}}>
                <Typography id="modal-title" sx={ModalTitleSyntax}>Create Book Record</Typography>

                <Box id="modal-description" sx={ModalBodySyntax}>
                    <TextField label="Book Name" name="name" type="text" size="small" value={book.name} onChange={onChange}/>
                    {
                        BookSearchFields.map((field, index) => 
                        (
                            <TextField key={index} label={field.label} name={field.name} value={book[field.name as keyof BookDataInterface]} 
                                type={field.type} size="small" onChange={onChange} select={field.select} slotProps={field.slotProps} />
                        ))
                    
                    }
                </Box>
                <Button variant='contained' sx={{marginRight: '10px'}}>Create</Button>
                <Button onClick={handleClose}>Exit</Button>
            </Box>
        </Modal>
    );
}

export default CreateBookModal;