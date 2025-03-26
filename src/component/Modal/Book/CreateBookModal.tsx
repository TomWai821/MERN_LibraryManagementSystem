import { ChangeEvent, FC, useMemo, useState } from 'react';
import { TextField, Button, Box, MenuItem, Typography, Avatar } from '@mui/material';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import CreateBookConfirmModal from '../Confirmation/Book/CreateBookConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Models
import { BookTableDataInterface } from '../../../Model/BookTableModel';
import { CreateBookModalInterface } from '../../../Model/ModelForModal';

// Data (CSS Syntax and dropdown data)
import { useDefinitionContext } from '../../../Context/Book/DefinitionContext';
import { BookImageFormat, DeleteButton, displayAsColumn, displayAsRow, ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import { useContactContext } from '../../../Context/Book/ContactContext';
import { ContactInterface, DefinitionInterface } from '../../../Model/ResultModel';
import { GetCurrentDate } from '../../../Controller/OtherController';

const CreateBookModal: FC<CreateBookModalInterface> = ({...bookData}) => 
{
    const { image, imageURL, bookname, language, languageID, genre, genreID, author, authorID, publisher, publisherID, description, publishDate } = bookData;

    const [ imageFile, setImageFile ] = useState<File | null>(image as File || null);
    const [ previewUrl, setPreviewUrl ] = useState<string | null>(imageURL as string || null);
    const [ book, setBook ] = useState(
        { 
            bookname: bookname || "", language: language || "", languageID: languageID || "", 
            genre: genre || "", genreID: genreID || "",  author: author || "", authorID: authorID || "", 
            publisher: publisher || "", publisherID: publisherID || "", description: description || "", publishDate: publishDate || GetCurrentDate("String") as string
        }
    );
    
    const { handleOpen } = useModal();
    const { definition } = useDefinitionContext();
    const { contact } = useContactContext();

    // For book filter
    const CreateBookInputField = useMemo(() => 
    [
        {name: "bookname", label: "Book Name", type:"text", select: false, slotProps: {}, multiline: false, rows: 1 },
        {name: "language", label: "Language", type:"text", select: true, options:definition.Language, slotProps: {}, multiline: false, rows: 1},
        {name: "genre", label: "Genre", type:"text", select: true, options:definition.Genre, slotProps:{}, multiline: false, rows: 1},
        {name: "author", label: "Author", type:"text", select: true, options:contact.Author, slotProps:{}, multiline: false, rows: 1},
        {name: "publisher", label: "Publisher", type:"text", select: true, options:contact.Publisher, slotProps:{}, multiline: false, rows: 1},
        {name: "publishDate", label: "Publish Date", type:"Date", select: false, slotProps:{}, multiline: false, rows: 1},
        {name: "description", label: "Description", type: "text", select: false, slotProps:{}, multiline: true, rows: 8}
    ],[definition])

    const onSelectChange = (event: ChangeEvent<HTMLInputElement>, index?:number) => 
    {
        const {name, value} = event.target;


        switch(name)
        {
            case "genre":
                setBook({...book, genre: value, genreID: definition.Genre[index as number]._id});
                break;

            case "language":
                setBook({...book, language: value, languageID: definition.Language[index as number]._id});
                break;

            case "author":
                setBook({...book, author: value, authorID: contact.Author[index as number]._id});
                break;
                
            case "publisher":
                setBook({...book, publisher: value, publisherID: contact.Publisher[index as number]._id});
                break;

            default:
                setBook({ ...book, [name]: value });
                break;
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
                    <Box sx={{...displayAsColumn, justifyContent: 'center', alignItems: 'center', width: '40%'}}>
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

                    <Box sx={{...displayAsColumn, marginLeft: '20px', gap: '20px 100px', width: '60%'}}>
                    {
                        CreateBookInputField.map((field, index) => 
                        (
                            <TextField key={index} label={field.label} name={field.name} value={book[field.name as keyof BookTableDataInterface]} 
                                type={field.type} size="small" 
                                select={field.select} slotProps={field.slotProps} multiline={field.multiline} rows={field.rows} 
                                onChange={(event) => 
                                    {
                                        const selectedIndex = field.options?.findIndex
                                        (
                                            (option) => 
                                            {
                                                const definitionOption = option as DefinitionInterface;
                                                const contactOption = option as ContactInterface;
                                                
                                                switch(field.name)
                                                {
                                                    case "genre":
                                                        return definitionOption.genre === event.target.value;
                                      
                                                    case "language":
                                                        return definitionOption.language === event.target.value;
                                                    
                                                    case "author":
                                                        return contactOption.author === event.target.value;
                                                    
                                                    case "publisher":
                                                        return contactOption.publisher === event.target.value;
                                                }
                                            }
                                        );
                                        onSelectChange(event as ChangeEvent<HTMLInputElement>, selectedIndex as number);
                                    }
                                }
                            >
                            {
                                field.options && field.options.map((option, index) => 
                                    {
                                        let value = "";
                                        const definitionOption = option as DefinitionInterface;
                                        const contactOption = option as ContactInterface;

                                        switch(field.name)
                                        {
                                            case "genre":
                                                value = definitionOption.genre as string;
                                                break;

                                            case "language":
                                                value = definitionOption.language as string;
                                                break;
                                            
                                            case "author":
                                                value = contactOption.author as string;
                                                break;
                                            
                                            case "publisher":
                                                value = contactOption.publisher as string;
                                                break;
                                        }

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
