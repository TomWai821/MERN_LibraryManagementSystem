import { FC, Fragment, useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import OptionFields from "../../../Manager/OptionFieldsManager";

// Context
import { useModal } from "../../../../Context/ModalContext";

// Another Modal
import CreateBookModal from "../../../Modal/Book/CreateBookModal";

// Models
import { FilterInterface } from "../../../../Model/TablePagesAndModalModel";
import { BookDataInterface, BookSearchInterface } from "../../../../Model/BookTableModel";

// Data(CSS Syntax and dropdown data)
import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";
import { useDefinationContext } from "../../../../Context/Book/DefinationContext";


const BookFilter: FC<FilterInterface> = (filterData) => 
{
    const {value, isAdmin, onChange, searchData} = filterData;
    const bookData = searchData as BookDataInterface;

    const [optionVisiable, setOptionVisiable] = useState(false);
    const [actionMenu, openActionMenu] = useState<HTMLElement | null>(null);
    const { handleOpen } = useModal();
    const { defination } = useDefinationContext();

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

    return (
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{ ...ItemToCenter, paddingBottom: '25px', alignItems: 'center' }}>
                <TextField label="Book Name" name="bookname" value={bookData["bookname"]} onChange={onChange} size="small" sx={{ width: '50%' }}/>
                <TextField label="Language" name="language" value={bookData["language"]} onChange={onChange} size="small" sx={{ width: '20%', marginLeft: '10px' }} select>
                    {   
                        defination.Language.map((language, index) => 
                        (
                            <MenuItem key={index} value={language.language}>{`${language.language}(${language.shortName})`}</MenuItem>
                        ))
                    }
                </TextField>
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

            <OptionFields value={value} type={"Book"} optionVisiable={optionVisiable} onChange={onChange} searchData={searchData}/>
        </Box>
    );
}

export default BookFilter;
