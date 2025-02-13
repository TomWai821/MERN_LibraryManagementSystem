import { FC } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { UserDataInterface } from '../../../../Model/TablePageModel';
import { useModal } from '../../../../Context/ModalContext';
import ModalTemplate from '../../../Templates/ModalTemplate';
import { DeleteButton, ModalBodySyntax } from '../../../../Maps/FormatSyntaxMaps';

const DeleteUserConfirmModal:FC<UserDataInterface> = ({...DeleteUserData}) => 
{
    const {name, email, role, status, gender} = DeleteUserData;
    const modalContext = useModal();
    
    return(
        <ModalTemplate title={"Delete User Record"} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                
            </Box>
            <Button variant='contained' sx={DeleteButton}>Yes</Button>
        </ModalTemplate>
    );
}

export default DeleteUserConfirmModal;