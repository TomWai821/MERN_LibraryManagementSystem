import { FC } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { UserDataInterface } from '../../../../Model/TablePageModel';
import { useModal } from '../../../../Context/ModalContext';
import ModalTemplate from '../../../Templates/ModalTemplate';
import { DeleteButton, ModalBodySyntax, ModalSubTitleSyntax } from '../../../../Maps/FormatSyntaxMaps';
import DeleteTypography from '../../DeleteTypography';

const DeleteUserConfirmModal:FC<UserDataInterface> = ({...userData}) => 
{
    const {username, email, role, gender} = userData;
    const modalContext = useModal();
    
    return(
        <ModalTemplate title={"Delete User Record"} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to delete this account?</Typography>
                <Typography>Username: {username}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Role: {role}</Typography>
                <Typography>Gender: {gender}</Typography>
            </Box>
            
            <DeleteTypography/>
            <Button variant='contained' sx={DeleteButton}>Yes</Button>
        </ModalTemplate>
    );
}

export default DeleteUserConfirmModal;