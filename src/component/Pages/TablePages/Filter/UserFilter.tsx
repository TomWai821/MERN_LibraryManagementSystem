
import { FC, useState } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";

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
import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";

const UserFilter:FC<FilterInterface> = (filterData) => 
{
    const {value, isAdmin, onChange, searchData, Search} = filterData;
    const userData = searchData as UserDataInterface;

    const [optionVisiable, setOptionVisiable] = useState(false);
    const {handleOpen} = useModal();
    
    const toggleCardVisibility = () => 
    {
        setOptionVisiable((prev) => !prev);
    };

    const openCreateUserModal = () => 
    {
        handleOpen(<CreateUserModal />);
    };

    return(
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{...ItemToCenter, paddingBottom: '25px', alignItems: 'center'}}>
                <TextField label={"Username"} value={userData.username} name="username" size="small" onChange={onChange} sx={{width: '75%'}}/>

                <IconButton onClick={toggleCardVisibility}>
                    {optionVisiable ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                </IconButton>
                
                <Button variant='contained' sx={{marginLeft: '10px'}} onClick={Search}>Search</Button>
                {(isAdmin && value === 0) &&
                    (
                        <Button variant='contained' sx={{marginLeft: '10px'}} onClick={openCreateUserModal}>Create User</Button>
                    )
                }
            </Box>

            <OptionFields value={value} type={"User"} optionVisiable={optionVisiable} onChange={onChange} searchData={searchData}/>
        </Box>
    );
}

export default UserFilter