import { ChangeEvent, FC, useState } from 'react'

import Box from '@mui/material/Box';
import { EditModalInterface, UserDataInterface } from '../../../Model/TablePageModel';
import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { Button, MenuItem, TextField } from '@mui/material';
import { EditUserInputField } from '../../../Maps/TextFieldsMaps';
import EditUserConfirmModal from '../Confirmation/User/EditUserConfirmModal';
import { UserResultDataInterface } from '../../../Model/ResultModel';

const EditUserModal:FC<EditModalInterface> = ({editData, compareData}) => 
{
    const {_id, username, email, role, status, gender} = editData as UserResultDataInterface;

    const [user, setUser] = useState<UserResultDataInterface>({_id: _id, username: username, email:email, role:role, status:status, gender:gender});

    const {handleOpen} = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setUser({...user, [name] : value})
    }

    const openConfirmModal = () => 
    {
        handleOpen(<EditUserConfirmModal editData={user} compareData={compareData} />);
    }
    
    return(
        <ModalTemplate title={"Edit User Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    EditUserInputField.map((field, index) => (
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
            <Button variant='contained' onClick={openConfirmModal}>Edit</Button>
        </ModalTemplate>
    );
}

export default EditUserModal;