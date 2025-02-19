import { ChangeEvent, FC, useState } from "react";
import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { BookSearchField } from "../../../../Maps/TextFieldsMaps";
import { useModal } from "../../../../Context/ModalContext";

import CreateBookModal from "../../../Modal/Book/CreateBookModal";

import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";
import { BookDataInterface, FilterInterface } from "../../../../Model/TablePageModel";
import OptionFields from "./OptionField/OptionFields";

const BookFilter: FC<FilterInterface> = ({ value, isAdmin }) => 
{
    const [searchBook, setSearchBook] = useState<BookDataInterface>({ bookname: "", language: "", genre: "", publisher: "", author: "", pages: "", amount: "" });
    const [optionVisiable, setOptionVisiable] = useState(false);
    const { handleOpen } = useModal();

    const toggleCardVisibility = () => 
    {
        setOptionVisiable((prev) => !prev);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setSearchBook({ ...searchBook, [event.target.name]: event.target.value });
    }

    const openCreateBookModal = () => 
    {
        handleOpen(<CreateBookModal />);
    };

    return (
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{ ...ItemToCenter, paddingBottom: '25px', alignItems: 'center' }}>
                <TextField label={"Book Name"} value={searchBook.bookname} name="name" id="name" onChange={onChange} size="small" sx={{ width: '75%' }} />
                <IconButton onClick={toggleCardVisibility}>
                    {optionVisiable ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
                <Button variant='contained' sx={{marginLeft: '10px'}}>Search</Button>
                {isAdmin && 
                    (
                        <Button variant='contained' sx={{ marginLeft: '10px' }} onClick={openCreateBookModal}>Create Book</Button>
                    )
                }
            </Box>

            <OptionFields value={value} type={"Book"} optionVisiable={optionVisiable} onChange={onChange} searchData={searchBook}/>
        </Box>
    );
}

export default BookFilter;
