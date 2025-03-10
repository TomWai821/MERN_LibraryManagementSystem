import { ChangeEvent, FC, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import CreateBookConfirmModal from '../Confirmation/Book/CreateBookConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Models
import { BookDataInterface } from '../../../Model/BookTableModel';
import { CreateModalInterface } from '../../../Model/TablePagesAndModalModel';

// Data (CSS Syntax and dropdown data)
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { CreateBookInputField } from '../../../Maps/TextFieldsMaps';

const CreateBookModal: FC<CreateModalInterface> = ({...bookData}) => 
{
    const { bookname, language, genre, publisher, author, pages, amount } = bookData as BookDataInterface;
    const [ book, setBook ] = useState<BookDataInterface>({ bookname: bookname, language: language, genre: genre, publisher: publisher, author: author, pages: pages, amount: amount });
    const { handleOpen } = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setBook({ ...book, [event.target.name]: event.target.value });
    }

    const onClick = () => 
    {
        handleOpen(<CreateBookConfirmModal data={book}/>);
    }

    return (
        <ModalTemplate title={"Create Book Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    CreateBookInputField.map((field, index) => (
                        <TextField key={index} label={field.label} name={field.name} value={book[field.name as keyof BookDataInterface]}
                            type={field.type} size="small" onChange={onChange} select={field.select} slotProps={field.slotProps}>
                        
                        </TextField>
                    ))
                }
            </Box>
            <Button variant='contained' onClick={onClick}>Create</Button>
        </ModalTemplate>
    );
}

export default CreateBookModal;
