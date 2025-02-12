import { ChangeEvent, FC, useState } from 'react'

import { Box, TextField, Button } from '@mui/material';
import { useModal } from '../../../Context/ModalContext';
import { BookDataInterface } from '../../../Model/TablePageModel';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { CreateTableInputField } from '../../../Maps/TextFieldsMaps';
import EditBookRecordConfirmModal from '../Confirmation/Book/EditBookConfirmModal';
import ModalTemplate from '../../Templates/ModalTemplate';

const EditBookModal:FC<BookDataInterface> = ({...defaultData}) => 
{
    const { name, genre, publisher, author, pages, amount } = defaultData;
    const [book, setBook] = useState<BookDataInterface>({name: name, genre: genre, publisher: publisher, author: author, pages: pages, amount: amount});
    const { handleOpen } = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setBook({...book, [event.target.name]: [event.target.value]})
    }

    const onClick = () => 
    {
        handleOpen(<EditBookRecordConfirmModal editData={book} defaultData={{...defaultData}}/>);
    }

    return(
        <ModalTemplate title={"Edit Book Record"} CancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            {
                CreateTableInputField.map((field, index) => 
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