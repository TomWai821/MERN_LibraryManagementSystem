import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { useModal } from '../../../Context/ModalContext';

const CreateUserModal:FC = ({}) => 
{
    const modalContext = useModal();
    
    return(
        <Box>
            <Typography>Edit User Record</Typography>
        </Box>
    );
}

export default CreateUserModal;