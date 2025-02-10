import { ChangeEvent, FC, useState } from "react";

// MUI functions and Icon
import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// Models
import { BookDataInterface, BookFilterInterface } from "../../../../Model/TablePageModel";
import { BookSearchFields } from "../../../../Model/UIRenderingModel/TextFieldsModel";

// For Modal
import { useModal } from "../../../../Context/ModalContext";
import CreateBookModal from "../../../Modal/Book/CreateBookModal";

const BookFilter:FC<BookFilterInterface> = ({isAdmin}) => 
{
    const [searchBook, setSearchBook] = useState({name: "", genre: "", publisher: "", author: "", pages: ""});
    const [optionVisiable, setOptionVisiable] = useState(false);

    const {handleOpen} = useModal();

    const toggleCardVisibility = () => 
    {
        setOptionVisiable((prev) => !prev);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setSearchBook({...searchBook, [event.target.name]: event.target.value })
    }

    const openCreateBookModal = () => 
    {
        handleOpen(<CreateBookModal />);
    };
    
    return(
            <Box sx={{ padding: '25px 15%' }}>
                <Box sx={{ paddingBottom: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField label={"Book Name"} value={searchBook.name} name="name" id="name" onChange={onChange} size="small" sx={{width: '75%'}}/>
                    <IconButton onClick={toggleCardVisibility}>
                        {optionVisiable ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                    </IconButton>
                    <Button variant='contained'>Search</Button>
                    {isAdmin?
                        <Button variant='contained' sx={{marginLeft: '10px'}} onClick={openCreateBookModal}>Create Book</Button>:<></>
                    }
                </Box>

                {optionVisiable && (
                <Card sx={{ padding: '15px'}}>
                    <Typography>Options</Typography>
                    <Box sx={{ padding: '15px 20px', display: 'grid', gap: '15px 50px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                        {BookSearchFields.map((field, index) => 
                            (
                                <TextField key={index} label={field.label} name={field.name} value={searchBook[field.name as keyof BookDataInterface]} 
                                        type={field.type} size="small" onChange={onChange} select={field.select} slotProps={field.slotProps}/>
                            ))
                        }
                    </Box>
                </Card>
                )}
            </Box>
    );
}

export default BookFilter