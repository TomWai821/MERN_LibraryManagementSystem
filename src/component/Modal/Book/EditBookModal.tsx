import { ChangeEvent, FC, useState } from 'react'

import { Box, TextField, Button } from '@mui/material';
import { useModal } from '../../../Context/ModalContext';
import { BookDataInterface, EditModalInterface } from '../../../Model/TablePageModel';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { CreateBookInputField } from '../../../Maps/TextFieldsMaps';
import EditBookConfirmModal from '../Confirmation/Book/EditBookConfirmModal';
import ModalTemplate from '../../Templates/ModalTemplate';

const EditBookModal:FC<EditModalInterface> = ({editData, compareData}) => 
{
    const { bookname, genre, publisher, author, pages, amount } = editData as BookDataInterface;

    const [book, setBook] = useState<BookDataInterface>({bookname: bookname, genre: genre, publisher: publisher, author: author, pages: pages, amount: amount});
    const { handleOpen } = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setBook({...book, [event.target.name]: [event.target.value]})
    }

    const onClick = () => 
    {
        handleOpen(<EditBookConfirmModal editData={book} compareData={compareData}/>);
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