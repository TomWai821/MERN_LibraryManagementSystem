import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { UserDataInterface } from '../../../../Model/TablePageModel';
import { useModal } from '../../../../Context/ModalContext';
import ModalTemplate from '../../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../../Maps/FormatSyntaxMaps';

const DeleteUserConfirmModal:FC<UserDataInterface> = ({name, email, role, status, gender}) => 
{
    const modalContext = useModal();
    
    return(
        <ModalTemplate title={"Delete User Record"} CancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}></Box>
        </ModalTemplate>
    );
}

export default DeleteUserConfirmModal;