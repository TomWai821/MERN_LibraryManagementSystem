import { ChangeEvent, FC, useState } from 'react'
import { Box, TextField, Button, MenuItem } from '@mui/material';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import EditBookConfirmModal from '../Confirmation/Book/EditBookConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Model
import { EditModalInterface } from '../../../Model/ModelForModal';
import { BookDataInterface } from '../../../Model/BookTableModel';

// Data (CSS Syntax)
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { useDefinationContext } from '../../../Context/Book/DefinationContext';

const EditBookModal:FC<EditModalInterface> = (editModalData) => 
{
    const { value, editData, compareData } = editModalData;
    const { bookname, language, genre, pages, description } = editData as BookDataInterface;
    const { defination } = useDefinationContext();

    // For book filter
    const CreateBookInputField = 
    [
        {name: "bookname", label: "Book Name", type:"text", select:false, slotProps: {}, multiline:false, rows: 1},
        {name: "language", label: "Language", type:"text", select:true, options:defination.Language, slotProps: {}, multiline:false, rows: 1},
        {name: "genre", label: "Genre", type:"text", select: true, options:defination.Genre ,slotProps:{}, multiline:false, rows: 1},
        {name: "pages", label: "Pages", type: "number", slotProps: {htmlInput:{min: 0}}, multiline:false, rows: 1},
        {name: "description", label: "Description", type: "text", select:false, slotProps:{}, multiline:true, rows: 5}
    ]

    const [book, setBook] = useState<BookDataInterface>({bookname: bookname, language: language, genre: genre, pages: pages, description: description});
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
                        <TextField key={index} label={field.label} name={field.name} value={book[field.name as keyof BookDataInterface]}
                            type={field.type} size="small" onChange={onChange} select={field.select} slotProps={field.slotProps} multiline={field.multiline} rows={field.rows}>
                                {
                                    field.options && field.options.map((option, index) => 
                                        (
                                            field.name === "genre" ? <MenuItem key={index} value={option.genre}>{option.genre}</MenuItem> : <MenuItem key={index} value={option.language}>{option.language}</MenuItem>
                                        )
                                    )
                                }
                        </TextField>
                    )
                )
            }
            </Box>
            <Button variant='contained' onClick={onClick}>Edit</Button>
        </ModalTemplate>
    );
}

export default EditBookModal;