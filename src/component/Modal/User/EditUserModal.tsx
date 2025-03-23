import { ChangeEvent, FC, useState } from 'react'
import { MenuItem, TextField, Box } from '@mui/material';

// UI Fragment
import ModalConfirmButton from '../../UIFragment/ModalConfirmButton';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import EditUserConfirmModal from '../Confirmation/User/EditUserConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Models
import { UserResultDataInterface } from '../../../Model/ResultModel';
import { UserDataInterface } from '../../../Model/UserTableModel';
import { EditModalInterface } from '../../../Model/ModelForModal';
import { ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import { EditUserInputField } from '../../../ArraysAndObjects/TextFieldsArrays';

// Data (Dropdown option and CSS Syntax)


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
    
    return(
        <ModalTemplate title={"Edit User Record"} width="400px" cancelButtonName={"Exit"}>
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

            <ModalConfirmButton clickEvent={openConfirmModal} name={"Edit"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditUserModal;