import { ChangeEvent, FC, useState } from 'react'

import { Box, Button, TextField } from '@mui/material'
import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { CreateUserInputField } from '../../../Maps/TextFieldsMaps';
import { UserDataInterface } from '../../../Model/TablePageModel';
import CreateUserConfirmModal from '../Confirmation/User/CreateUserConfirmModal';

const CreateUserModal:FC = ({}) => 
{
    const [user, setUser] = useState({username: "", password: "", email:"", role:"", status:"", gender:""});

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
        <ModalTemplate title={"Create User Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            {
                CreateUserInputField.map((field, index) => (
                    <TextField key={index} label={field.label} name={field.name} value={user[field.name as keyof UserDataInterface]}
                        type={field.type} size="small" onChange={onChange} select={field.select}/>
                ))   
            }
            </Box>
            <Button variant='contained' onClick={OpenConfirmModal}>Create</Button>
        </ModalTemplate>
    );
}

export default CreateUserModal;