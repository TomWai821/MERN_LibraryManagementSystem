
import { FC, useState } from "react";
import { Box, Button, IconButton, MenuItem, TextField } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { FilterInterface, UserDataInterface } from "../../../../Model/TablePageModel";
import { UserOtherSearchField } from "../../../../Maps/TextFieldsMaps";

import { useModal } from "../../../../Context/ModalContext";
import CreateUserModal from "../../../Modal/User/CreateUserModal";
import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";
import OptionFields from "./OptionField/OptionFields";

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
                {value === 0 ? 
                    <TextField label={"Username"} value={userData.username} name="username" size="small" onChange={onChange} sx={{width: '75%'}}/>:
                    UserOtherSearchField.map((field, index) => (
                        <TextField label={field.label} key={index} name={field.name} select={field.select} onChange={onChange} sx={{...field.syntax}} size="small">
                            {
                                field.select && field.options?.map((option, index) => 
                                    (
                                        <MenuItem key={index} value={option} sx={{height: '40px'}}>{option}</MenuItem>
                                    )
                                )
                            }
                        </TextField>
                    ))
                }
                
                {isAdmin &&
                    (
                        <IconButton onClick={toggleCardVisibility}>
                            {optionVisiable ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                        </IconButton>
                    )
                }
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