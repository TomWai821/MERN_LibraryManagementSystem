import { ChangeEvent, FC, useMemo, useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import CreateBookConfirmModal from '../Confirmation/Book/CreateBookConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Models
import { BookDataInterface } from '../../../Model/BookTableModel';
import { CreateBookModalInterface } from '../../../Model/ModelForModal';

// Data (CSS Syntax and dropdown data)
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { useDefinationContext } from '../../../Context/Book/DefinationContext';

const CreateBookModal: FC<CreateBookModalInterface> = ({...bookData}) => 
{
    const { bookname, language, languageID, genre, genreID, pages, description } = bookData;
    const [ book, setBook ] = useState({ bookname: bookname || "", language: language || "", languageID: languageID || "", genre: genre || "", genreID: genreID || "", pages: pages || 0, description: description || ""});
    const { handleOpen } = useModal();
    const { defination } = useDefinationContext();

    // For book filter
    const CreateBookInputField = useMemo(() => 
    [
        {name: "bookname", label: "Book Name", type:"text", select:false, slotProps: {}, multiline: false, rows: 1 },
        {name: "language", label: "Language", type:"text", select:true, options:defination.Language, slotProps: {}, multiline: false, rows: 1},
        {name: "genre", label: "Genre", type:"text", select: true, options:defination.Genre, slotProps:{}, multiline: false, rows: 1},
        {name: "pages", label: "Pages", type: "number", slotProps: {htmlInput:{min: 0}}, multiline: false, rows: 1},
        {name: "description", label: "Description", type: "text", select:false, slotProps:{}, multiline: true, rows: 5}
    ],[defination])

    const onSelectChange = (event: ChangeEvent<HTMLInputElement>, index?:number) => 
    {
        const {name, value} = event.target;

        if(name === "genre")
        {
            setBook({...book, genre: value, genreID: defination.Genre[index as number]._id});
        }
        else if(name === "language")
        {
            setBook({...book, language: value, languageID: defination.Language[index as number]._id});
        }
        else
        {
            setBook({ ...book, [name]: value });
        }
    }

    const OpenConfirmModal = () => 
    {
        handleOpen(<CreateBookConfirmModal data={book}/>);
    }

    return (
        <ModalTemplate title={"Create Book Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    CreateBookInputField.map((field, index) => 
                    (
                        <TextField key={index} label={field.label} name={field.name} value={book[field.name as keyof BookDataInterface]}
                            type={field.type} size="small"  select={field.select} slotProps={field.slotProps} multiline={field.multiline} rows={field.rows} 
                            onChange={(event) => 
                                {
                                    const selectedIndex = field.options?.findIndex
                                    (
                                        (option) =>
                                            (field.name === "genre" && option.genre === event.target.value) ||
                                            (field.name === "language" && option.language === event.target.value)
                                    );
                                    onSelectChange(event as ChangeEvent<HTMLInputElement>, selectedIndex as number);
                                }
                            }
                        >
                                {
                                    field.options && field.options.map((option, index) => 
                                        {
                                            const value = field.name === "genre" ? option.genre: option.language;
                                            return(<MenuItem key={index} value={value}>{value}</MenuItem> )
                                        }
                                    )
                                }
                        </TextField>
                    ))
                }
            </Box>
            <Button variant='contained' onClick={OpenConfirmModal}>Create</Button>
        </ModalTemplate>
    );
}

export default CreateBookModal;
