import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { UserDataInterface } from '../../../Model/TablePageModel';
import { useModal } from '../../../Context/ModalContext';

const DeleteUserModal:FC<UserDataInterface> = ({name, email, role, status, gender}) => 
{
    const modalContext = useModal();
    
    return(
        <Box>
            <Typography>Delete User Record</Typography>
        </Box>
    );
}

export default DeleteUserModal;