import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'
import { Box, TextField, Button, MenuItem, Avatar, Typography } from '@mui/material';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import EditBookConfirmModal from '../Confirmation/Book/EditBookConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Model
import { EditModalInterface } from '../../../Model/ModelForModal';

// Data (CSS Syntax)
import { BookImageFormat, DeleteButton, displayAsColumn, displayAsRow, ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import { useDefinitionContext } from '../../../Context/Book/DefinitionContext';
import { BookDataInterfaceForEdit, ContactInterface, DefinitionInterface } from '../../../Model/ResultModel';
import { BookTableDataInterface } from '../../../Model/BookTableModel';
import { useContactContext } from '../../../Context/Book/ContactContext';

const EditBookModal:FC<EditModalInterface> = (editModalData) => 
{
    const { value, editData, compareData } = editModalData;
    const EditData = editData as BookDataInterfaceForEdit;
    const CompareData = compareData as BookDataInterfaceForEdit;

    const { definition } = useDefinitionContext();
    const { contact } = useContactContext();
    const { handleOpen } = useModal();
    
    const [ book, setBook ] = useState(
        {   
            _id: EditData._id, bookname: EditData.bookname, language: EditData.language as string, languageID: EditData.languageID, 
            genre: EditData.genre, genreID: EditData.genreID, author: EditData.author, authorID: EditData.authorID,
            publisher: EditData.publisher, publisherID: EditData.publisherID, description: EditData.description, filename: EditData.filename, imageUrl: EditData.imageUrl, image: EditData.image
        }
    );

    const CompareBook = 
    { 
        _id: CompareData._id, bookname: CompareData.bookname, language: CompareData.language as string, languageID: CompareData.languageID, 
        genre: CompareData.genre, genreID: CompareData.genreID, author: CompareData.author, authorID: CompareData.authorID,
        publisher: CompareData.publisher, publisherID: CompareData.publisherID, description: CompareData.description, filename: CompareData.filename, imageUrl: CompareData.imageUrl 
    };

    const CreateBookInputField = useMemo(() => 
    [
        {name: "bookname", label: "Book Name", type:"text", select: false, slotProps: {}, multiline: false, rows: 1 },
        {name: "language", label: "Language", type:"text", select: true, options:definition.Language, slotProps: {}, multiline: false, rows: 1},
        {name: "genre", label: "Genre", type:"text", select: true, options:definition.Genre, slotProps:{}, multiline: false, rows: 1},
        {name: "author", label: "Author", type:"text", select: true, options:contact.Author, slotProps:{}, multiline: false, rows: 1},
        {name: "publisher", label: "Publisher", type:"text", select: true, options:contact.Publisher, slotProps:{}, multiline: false, rows: 1},
        {name: "description", label: "Description", type: "text", select:false, slotProps:{}, multiline: true, rows: 8}
    ],[definition])

    const [imageFile, setImageFile] = useState<File | null>(book.image || null); 
    const [previewUrl, setPreviewUrl] = useState<string | null>(book.imageUrl || null);

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

            default:
                setBook({ ...book, [name]: value });
                break;
        }
    }
    
    useEffect(() => 
    {
        const fetchImage = async (imageURL: string) => 
        {
            try 
            {
                const response = await fetch(imageURL);
    
                if (!response.ok) 
                {
                    throw new Error("Failed to fetch image");
                }
    
                const blob = await response.blob(); 
                const file = new File([blob], CompareData.filename as string, { type: blob.type });
    
                setImageFile(file);
                const preview = URL.createObjectURL(blob);
                setPreviewUrl(preview);
            } 
            catch (error) 
            {
                console.error("Error fetching image:", error);
            }
        };
    
        if (book.imageUrl) 
        {
            fetchImage(book.imageUrl);
        }
    }, [EditData.imageUrl, CompareData.imageUrl, CompareData.filename]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const target = event.target;
        const file = target.files?.[0];
        if (file) 
        {
            setImageFile(file);
            book.filename = file.name;

            const newFile = URL.createObjectURL(file);
            setPreviewUrl(newFile);
            book.imageUrl = newFile;
        }
        target.value = ""; 
    };

    const removeImage = () => 
    {
        if (previewUrl) 
        {
            URL.revokeObjectURL(previewUrl); 
            setPreviewUrl(null);
            book.imageUrl = "";

            setImageFile(null);
            book.filename = "";
        }
    };

    const OpenConfirmModal = () => 
    {
        handleOpen(<EditBookConfirmModal editData={{...book, image: imageFile, imageURL: previewUrl}} compareData={CompareBook} value={value}/>);
    }

    return (
        <ModalTemplate title={"Edit Book Record"} minWidth="500px" maxWidth="750px" width="100%" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Box sx={{...displayAsRow, marginBottom: '10px !important'}}>
                    <Box sx={{...displayAsColumn, justifyContent: 'center', alignItems: 'center', width: '40%'}}>
                        {previewUrl  ?
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
                            book.imageUrl && 
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
                                type={field.type} size="small" select={field.select} slotProps={field.slotProps} multiline={field.multiline} rows={field.rows} 
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
            <Button variant='contained' onClick={OpenConfirmModal}>Edit</Button>
        </ModalTemplate>
    );
}

export default EditBookModal;