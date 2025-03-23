import { ChangeEvent, FC, useState } from 'react'
import { Box, MenuItem, TextField } from '@mui/material'

// Context
import { useModal } from '../../../Context/ModalContext';

// Another Modals
import CreateUserConfirmModal from '../Confirmation/User/CreateUserConfirmModal';

// Models
import ModalTemplate from '../../Templates/ModalTemplate';

import { GetCurrentDate } from '../../../Controller/OtherController';
import { UserDataInterface } from '../../../Model/UserTableModel';

// UI Fragment
import ModalConfirmButton from '../../UIFragment/ModalConfirmButton';

// Arrays And Object(For Dropdown Data and css syntax)
import { ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import { CreateUserInputField } from '../../../ArraysAndObjects/TextFieldsArrays';

const CreateUserModal:FC = ({}) => 
{
    const [user, setUser] = useState({username: "", password: "", email: "", role: "User", status: "", gender: "Male", birthDay: GetCurrentDate("String") as Date});

    const {handleOpen} = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setUser({...user, [event.target.name] : event.target.value})
    }

    const OpenConfirmModal = () => 
    {
        handleOpen(<CreateUserConfirmModal {...user}/>);
    }
    
    return(
        <ModalTemplate title={"Create User Record"} width="400px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            {
                CreateUserInputField.map((field, index) => 
                (
                    <TextField key={index} label={field.label} name={field.name} value={user[field.name as keyof UserDataInterface]}
                        type={field.type} size="small" onChange={onChange} select={field.select}>
                        {
                            field.select && field.options.map((option, index) => 
                            (
                                <MenuItem key={index} value={option}>{option}</MenuItem>
                            ))
                        }
                    </TextField>
                ))   
            }
            </Box>
            
            <ModalConfirmButton clickEvent={OpenConfirmModal} name={"Create"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default CreateUserModal;