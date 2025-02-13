
import { ChangeEvent, FC, useState } from "react";

import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { UserDataInterface, UserFilterInterface } from "../../../../Model/TablePageModel";
import { UserSearchField } from "../../../../Maps/TextFieldsMaps";

import { useModal } from "../../../../Context/ModalContext";
import CreateUserModal from "../../../Modal/User/CreateUserModal";
import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";

const UserFilter:FC<UserFilterInterface> = ({isAdmin}) => 
{
    const [searchUser, setsearchUser] = useState({name: "", email:"", role:"", status:"", gender:""});
    const [optionVisiable, setOptionVisiable] = useState(false);
    
    const toggleCardVisibility = () => 
    {
        setOptionVisiable((prev) => !prev);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setsearchUser({...searchUser, [event.target.name] : event.target.value})
    }

    const {handleOpen} = useModal();

    const openCreateUserModal = () => 
    {
        handleOpen(<CreateUserModal />);
    };

    return(
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{...ItemToCenter, paddingBottom: '25px', alignItems: 'center'}}>
                <TextField label={"Username"} value={searchUser.name} size="small" sx={{width: '75%', marginRight: '10px'}}/>
                <IconButton onClick={toggleCardVisibility}>
                    {optionVisiable ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                </IconButton>
                <Button variant='contained'>Search</Button>
                {isAdmin?
                    <Button variant='contained' sx={{marginLeft: '10px'}} onClick={openCreateUserModal}>Create User</Button>: <></>
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