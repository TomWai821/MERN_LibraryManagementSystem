import { ChangeEvent, FC, useState } from 'react'

import Box from '@mui/material/Box';
import { EditModalInterface, UserDataInterface } from '../../../Model/TablePageModel';
import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { Button, TextField } from '@mui/material';
import { EditUserInputField } from '../../../Maps/TextFieldsMaps';
import EditUserConfirmModal from '../Confirmation/User/EditUserConfirmModal';

const EditUserModal:FC<EditModalInterface> = ({editData, compareData}) => 
{
    const {username, email, role, status, gender} = editData as UserDataInterface;

    const [user, setUser] = useState({username: username, email:email, role:role, status:status, gender:gender});

    const {handleOpen} = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setUser({...user, [event.target.name] : event.target.value})
    }

    const openConfirmModal = () => 
    {
        handleOpen(<EditUserConfirmModal editData={user} compareData={compareData}/>);
    }
    
    return(
        <ModalTemplate title={"Edit User Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    EditUserInputField.map((field, index) => (
                        <TextField key={index} label={field.label} name={field.name} value={user[field.name as keyof UserDataInterface]}
                            type={field.type} size="small" onChange={onChange} select={field.select}/>
                    ))   
                }
            </Box>
            <Button variant='contained' onClick={openConfirmModal}>Edit</Button>
        </ModalTemplate>
    );
}

export default EditUserModal;