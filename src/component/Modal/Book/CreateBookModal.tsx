import { ChangeEvent, FC, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { CreateBookInputField } from '../../../Maps/TextFieldsMaps';
import { BookDataInterface, CreateModalInterface } from '../../../Model/TablePageModel';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { useModal } from '../../../Context/ModalContext';
import CreateBookConfirmModal from '../Confirmation/Book/CreateBookConfirmModal';

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
