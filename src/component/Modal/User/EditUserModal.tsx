import { ChangeEvent, FC, useState } from 'react'

import Box from '@mui/material/Box';
import { EditModalInterface } from '../../../Model/TablePagesAndModalModel';
import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { Button, MenuItem, TextField } from '@mui/material';
import { EditUserInputField } from '../../../Maps/TextFieldsMaps';
import EditUserConfirmModal from '../Confirmation/User/EditUserConfirmModal';
import { UserResultDataInterface } from '../../../Model/ResultModel';
import { UserDataInterface } from '../../../Model/UserTableModel';

const EditUserModal:FC<EditModalInterface> = (editModalData) => 
{
    const {value, editData, compareData} = editModalData;
    const {handleOpen} = useModal();
    
    const {_id, username, email, role, status, gender} = editData as UserResultDataInterface;
    const [user, setUser] = useState<UserResultDataInterface>({_id: _id, username: username, email:email, role:role, status:status, gender:gender});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setUser({...user, [name] : value})
    }

    const openConfirmModal = () => 
    {
        handleOpen(<EditUserConfirmModal value={value} editData={user} compareData={compareData} />);
    }

    const setTitle = ():string => 
    {
        switch(value)
        {
            case 0:
                return "Edit User Record";
            
            case 1:
                return "Edit Ban Record";

            default:
                return "";
        }
    }
    
    return(
        <ModalTemplate title={setTitle() as string} cancelButtonName={"Exit"}>
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