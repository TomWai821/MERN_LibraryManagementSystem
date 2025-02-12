import { ChangeEvent, FC, useState } from 'react'


import { TextField, Button, Box } from '@mui/material';

import { CreateTableInputField } from '../../../Maps/TextFieldsMaps';
import { BookDataInterface } from '../../../Model/TablePageModel';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { useModal } from '../../../Context/ModalContext';
import CreateBookConfirmModal from '../Confirmation/Book/CreateBookConfirmModal';


const CreateBookModal:FC = ({}) => 
{
    const [book, setBook] = useState<BookDataInterface>({name: "", genre: "", publisher: "", author: "", pages: "", amount: ""});
    const {handleOpen} = useModal();
    
    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setBook({...book, [event.target.name]: event.target.value});
    }

    const onClick = () => 
    {
        handleOpen(<CreateBookConfirmModal defaultData={book}/>);
        console.log("opened")
    }

    return(
        <ModalTemplate title={"Create Book Record"} CancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            {
                CreateTableInputField.map((field, index) => 
                (
                    <TextField key={index} label={field.label} name={field.name} value={book[field.name as keyof BookDataInterface]} 
                        type={field.type} size="small" onChange={onChange} select={field.select} slotProps={field.slotProps} />
                ))
            }
            </Box>

            <Button variant='contained' onClick={onClick}>Create</Button>
        </ModalTemplate>
                
        
    );
}

export default CreateBookModal;