import { ChangeEvent, FC, Fragment, useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { useModal } from "../../../../Context/ModalContext";

import CreateBookModal from "../../../Modal/Book/CreateBookModal";

import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";
import { BookDataInterface, BookSearchInterface, FilterInterface } from "../../../../Model/TablePageModel";
import OptionFields from "./OptionField/OptionFields";
import { BookMainSearchField } from "../../../../Maps/TextFieldsMaps";

const BookFilter: FC<FilterInterface> = ({ value, isAdmin }) => 
{
    const [searchBook, setSearchBook] = useState<BookDataInterface>({ bookname: "", language: "", genre: "", publisher: "", author: "", pages: "", amount: "" });
    const [optionVisiable, setOptionVisiable] = useState(false);
    const [actionMenu, openActionMenu] = useState<HTMLElement | null>(null);
    const { handleOpen } = useModal();

    const ActionMenu = 
    [
        {label: 'Create book', clickEvent: () => handleOpen(<CreateBookModal />)},
        {label: 'Issue book', clickEvent: () => handleOpen(<></>)},
        {label: 'Return book', clickEvent: () => handleOpen(<></>)}
    ]

    const toggleCardVisibility = () => 
    {
        setOptionVisiable((prev) => !prev);
    };

    const handleActionMenu = (event: React.MouseEvent<HTMLElement>) => 
    {
        openActionMenu(actionMenu ? null : event?.currentTarget);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setSearchBook({ ...searchBook, [event.target.name]: event.target.value });
    }

    return (
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{ ...ItemToCenter, paddingBottom: '25px', alignItems: 'center' }}>
                {
                    BookMainSearchField.map((searchField, index) => 
                    (
                        <Fragment key={index}>
                            <TextField label={searchField.label} name={searchField.name} value={searchBook[searchField.name as keyof BookSearchInterface]} onChange={onChange} size="small" sx={searchField.syntax} select={searchField.select}/>
                        </Fragment>
                    ))
                }
                <IconButton onClick={toggleCardVisibility}>
                    {optionVisiable ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
                <Button variant='contained' sx={{marginLeft: '10px'}}>Search</Button>
                {isAdmin && 
                    (
                        <Fragment>
                            <Button variant='contained' sx={{ marginLeft: '10px' }} onClick={handleActionMenu}>Action</Button>
                            <Menu open={Boolean(actionMenu)} anchorEl={actionMenu} onClose={handleActionMenu}>
                            {
                                ActionMenu.map((action, index) =>(
                                    <MenuItem key={index}>
                                        <Typography onClick={action.clickEvent}>{action.label}</Typography>
                                    </MenuItem>
                                    )
                                )
                            }
                            </Menu>
                        </Fragment>
                    )
                }
            </Box>

            <OptionFields value={value} type={"Book"} optionVisiable={optionVisiable} onChange={onChange} searchData={searchBook}/>
        </Box>
    );
}

export default BookFilter;
