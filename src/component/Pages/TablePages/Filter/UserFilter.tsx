
import { ChangeEvent, FC, useState } from "react";

import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { FilterInterface, UserDataInterface } from "../../../../Model/TablePageModel";
import { UserSearchField } from "../../../../Maps/TextFieldsMaps";

import { useModal } from "../../../../Context/ModalContext";
import CreateUserModal from "../../../Modal/User/CreateUserModal";
import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";

const UserFilter:FC<FilterInterface> = ({isAdmin}) => 
{
    const [searchUser, setsearchUser] = useState({username: "", email:"", role:"", status:"", gender:""});
    const [optionVisiable, setOptionVisiable] = useState(false);

    const {handleOpen} = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setsearchUser({...searchUser, [event.target.name] : event.target.value})
    }
    
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
                <TextField label={"Username"} value={searchUser.username} name="username" size="small" onChange={onChange} sx={{width: '75%'}}/>
                {isAdmin &&
                    (
                        <IconButton onClick={toggleCardVisibility}>
                            {optionVisiable ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                        </IconButton>
                    )
                }
                <Button variant='contained' sx={{marginLeft: '10px'}}>Search</Button>
                {isAdmin &&
                    (
                        <Button variant='contained' sx={{marginLeft: '10px'}} onClick={openCreateUserModal}>Create User</Button>
                    )
                }
            </Box>

            {optionVisiable && (
            <Card sx={{ padding: '15px'}}>
                <Typography>Options</Typography>
                <Box sx={{ padding: '15px 20px', display: 'grid', gap: '15px 50px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                    {UserSearchField.map((field, index) => 
                        (
                            <TextField key={index} label={field.label} name={field.name} value={searchUser[field.name as keyof UserDataInterface]} 
                                type={field.type} size="small" onChange={onChange} select={field.select}/>
                        ))
                    }
                </Box>
            </Card>
            )}
        </Box>
    );
}

export default UserFilter