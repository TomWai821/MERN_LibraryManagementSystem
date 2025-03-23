import { ChangeEvent, FC, useMemo, useState } from 'react';
import { TextField, Button, Box, MenuItem, Typography, Avatar } from '@mui/material';

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
import { useDefinationContext } from '../../../Context/Book/DefinationContext';
import { BookImageFormat, DeleteButton, displayAsColumn, displayAsRow, ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';

const CreateBookModal: FC<CreateBookModalInterface> = ({...bookData}) => 
{
    const { image, imageURL, bookname, language, languageID, genre, genreID, pages, description } = bookData;
    const [imageFile, setImageFile] = useState<File | null>(image as File || null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(imageURL as string || null);
    const [ book, setBook ] = useState({ bookname: bookname || "", language: language || "", languageID: languageID || "", genre: genre || "", genreID: genreID || "", pages: pages || 0, description: description || ""});
    const { handleOpen } = useModal();
    const { defination } = useDefinationContext();

    // For book filter
    const CreateBookInputField = useMemo(() => 
    [
        {name: "bookname", label: "Book Name", type:"text", select: false, slotProps: {}, multiline: false, rows: 1 },
        {name: "language", label: "Language", type:"text", select: true, options:defination.Language, slotProps: {}, multiline: false, rows: 1},
        {name: "genre", label: "Genre", type:"text", select: true, options:defination.Genre, slotProps:{}, multiline: false, rows: 1},
        {name: "pages", label: "Pages", type: "number", slotProps: {htmlInput:{min: 0}}, multiline: false, rows: 1},
        {name: "description", label: "Description", type: "text", select:false, slotProps:{}, multiline: true, rows: 8}
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

    // Handle file upload
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const target = event.target;
        const file = target.files?.[0];
        if (file) 
        {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
        target.value = '';
    };

    const removeImage = () => 
    {
        if (previewUrl) 
        {
            URL.revokeObjectURL(previewUrl);
            setImageFile(null);
            setPreviewUrl(null); 
        }
    };

    const OpenConfirmModal = () => 
    {
        handleOpen(<CreateBookConfirmModal data={{...book, image: imageFile, imageURL: previewUrl}}/>);
    }

    return (
        <ModalTemplate title={"Create Book Record"} minWidth="500px" maxWidth="750px" width="100%" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Box sx={{...displayAsRow, marginBottom: '10px'}}>
                    <Box sx={{...displayAsColumn, justifyContent: 'center', alignItems: 'center', minWidth: '200px', maxWidth: '350px', width: '40%'}}>
                        {previewUrl ?
                            (
                            /*
                                Vanilla HTML Element for display image
                                <img src={previewUrl} style={{ width: '150px', height: 'auto', borderRadius: 8 }}/>
                            */
                                <Avatar src={previewUrl} alt="Preview" variant="rounded" sx={BookImageFormat}/>
                            )
                            :
                            <Typography>No Image Uploaded</Typography>
                        }
                        
                        <Button variant="contained" component="label" sx={{ width: '100%', marginTop: '10px' }}>
                            Upload Image {<input hidden type="file" accept="image/*" onChange={handleFileChange} /> }
                        </Button>

                        {
                            previewUrl && 
                            (
                                <Button variant="contained" sx={{ backgroundColor:DeleteButton.backgroundColor, width: '100%', marginTop: '10px' }} onClick={removeImage}>Remove Image</Button>
                            )
                        }
                    </Box>

                    <Box sx={{...displayAsColumn, marginLeft: '20px', gap: '20px 100px', minWidth: '200px', maxWidth: '400px', width: '60%'}}>
                    {
                        CreateBookInputField.map((field, index) => 
                        (
                            <TextField key={index} label={field.label} name={field.name} value={book[field.name as keyof BookDataInterface]} 
                                type={field.type} size="small" 
                                select={field.select} slotProps={field.slotProps} multiline={field.multiline} rows={field.rows} 
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
                </Box>
            </Box>
            <Button variant='contained' onClick={OpenConfirmModal}>Create</Button>
        </ModalTemplate>
    );
}

export default CreateBookModal;
