import { FC, useState } from 'react'

import { Box, Button, TextField } from '@mui/material'
import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { CreateUserInputField } from '../../../Maps/TextFieldsMaps';
import { UserDataInterface } from '../../../Model/TablePageModel';

const CreateUserModal:FC = ({}) => 
{
    const [user, setUser] = useState({name: "", email:"", role:"", status:"", gender:""});

    const modalContext = useModal();

    const onChange = () => 
    {

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
            <Button variant='contained'>Create</Button>
        </ModalTemplate>
    );
}

export default CreateUserModal;