import { ChangeEvent, FC, useState } from 'react'
import { Box, TextField, Button } from '@mui/material';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import EditBookConfirmModal from '../Confirmation/Book/EditBookConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Model
import { EditModalInterface } from '../../../Model/TablePagesAndModalModel';
import { BookDataInterface } from '../../../Model/BookTableModel';


// Data (CSS Syntax)
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { CreateBookInputField } from '../../../Maps/TextFieldsMaps';

const EditBookModal:FC<EditModalInterface> = (editModalData) => 
{
    const { value, editData, compareData } = editModalData;
    const { bookname, language, genre, publisher, author, pages, amount } = editData as BookDataInterface;

    const [book, setBook] = useState<BookDataInterface>({bookname: bookname, language: language, genre: genre, publisher: publisher, author: author, pages: pages, amount: amount});
    const { handleOpen } = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setBook({...book, [event.target.name]: [event.target.value]})
    }

    const onClick = () => 
    {
        handleOpen(<EditBookConfirmModal editData={book} compareData={compareData} value={value}/>);
    }

    return(
        <ModalTemplate title={"Edit Book Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            {
                CreateBookInputField.map((field, index) => 
                    (
                        <TextField key={index} label={field.label} name={field.name} 
                                type={field.type} size="small" value={book[field.name as keyof BookDataInterface]} onChange={onChange} select={field.select} slotProps={field.slotProps} required/>
                    )
                )
            }
            </Box>
            <Button variant='contained' onClick={onClick}>Edit</Button>
        </ModalTemplate>
    );
}

export default EditBookModal;