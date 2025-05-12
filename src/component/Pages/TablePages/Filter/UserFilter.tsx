
import { FC, useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import OptionFields from "../../../Manager/OptionFieldsManager";

// Context
import { useModal } from "../../../../Context/ModalContext";

import CreateUserModal from "../../../Modal/User/CreateUserModal";

// Models
import { FilterInterface } from "../../../../Model/TablePagesAndModalModel";
import { UserDataInterface } from "../../../../Model/UserTableModel";

// data (CSS Syntax)
import { ItemToCenter } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { useAuthContext } from "../../../../Context/User/AuthContext";

const UserFilter:FC<FilterInterface> = (filterData) => 
{
    const {value, onChange, searchData, Search, resetFilter} = filterData;
    const {IsAdmin} = useAuthContext();
    const {handleOpen} = useModal();

    const userData = searchData as UserDataInterface;

    const [optionVisiable, setOptionVisiable] = useState(false);
    const [actionMenu, openActionMenu] = useState<HTMLElement | null>(null);

    const ActionMenu = 
    [
        {label: 'Reset Filter', clickEvent: resetFilter},
        {label: 'Create User', clickEvent: () => handleOpen(<CreateUserModal />)}
    ]
    
    const toggleCardVisibility = () => 
    {
        setOptionVisiable((prev) => !prev);
    };

    const handleActionMenu = (event: React.MouseEvent<HTMLElement>) => 
    {
        openActionMenu(actionMenu ? null : event?.currentTarget);
    };

    return(
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{...ItemToCenter, paddingBottom: '25px', alignItems: 'center'}}>
                <TextField label={"Username"} value={userData.username} name="username" size="small" onChange={onChange} sx={{width: '60%'}}/>

                <IconButton onClick={toggleCardVisibility}>
                    {optionVisiable ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                </IconButton>
                
                <Button variant='contained' sx={{marginLeft: '10px'}} onClick={Search}>Search</Button>
                
                {IsAdmin() && value === 0 ?
                    <Button variant='contained' sx={{ marginLeft: '10px' }} onClick={handleActionMenu}>Action</Button> 
                    : 
                    <Button variant='contained' sx={{ marginLeft: '10px' }} onClick={resetFilter}>Reset Filter</Button> 
                }

                <Menu open={Boolean(actionMenu)} anchorEl={actionMenu} onClose={handleActionMenu}>
                    {(IsAdmin() && value === 0) &&
                        (
                            ActionMenu.map((action, index) =>
                                (
                                    <MenuItem key={index}>
                                        <Typography onClick={action.clickEvent}>{action.label}</Typography>
                                    </MenuItem>
                                )
                            )
                        )
                    }
                </Menu>
            </Box>

            <OptionFields value={value} type={"User"} optionVisiable={optionVisiable} onChange={onChange} searchData={searchData}/>
        </Box>
    );
}

export default UserFilter