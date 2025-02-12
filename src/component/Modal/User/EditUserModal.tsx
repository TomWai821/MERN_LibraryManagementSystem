import { FC } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserDataInterface } from '../../../Model/TablePageModel';
import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';

const EditUserModal:FC<UserDataInterface> = ({...defaultData}) => 
{
    const {name, email, role, status, gender} = defaultData;
    const modalContext = useModal();
    
    return(
        <ModalTemplate title={"Edit User Record"} CancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}></Box>
        </ModalTemplate>
    );
}

export default EditUserModal;