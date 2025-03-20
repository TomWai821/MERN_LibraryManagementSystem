import { ChangeEvent, FC, useMemo, useState } from 'react'
import { Box, TextField, Button, MenuItem } from '@mui/material';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import EditBookConfirmModal from '../Confirmation/Book/EditBookConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Model
import { CreateBookModalInterface, EditModalInterface } from '../../../Model/ModelForModal';
import { BookDataInterface } from '../../../Model/BookTableModel';

// Data (CSS Syntax)
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { useDefinationContext } from '../../../Context/Book/DefinationContext';
import { BookResultDataInterface } from '../../../Model/ResultModel';

const EditBookModal:FC<EditModalInterface> = (editModalData) => 
{
    const { value, editData, compareData } = editModalData;
    const { _id, bookname, language, languageID,  genre, genreID, pages, description} = editData as BookResultDataInterface;
    const { defination } = useDefinationContext();

    const [book, setBook] = useState({_id: _id, bookname: bookname, language: language as string, languageID: languageID, genre: genre, genreID: genreID, pages: pages, description: description});
    const { handleOpen } = useModal();

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
                    )
                )
            }
            </Box>
            <Button variant='contained' onClick={onClick}>Edit</Button>
        </ModalTemplate>
    );
}

export default EditBookModal;