import { FC } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserDataInterface } from '../../../Model/TablePageModel';
import { useModal } from '../../../Context/ModalContext';

const EditUserModal:FC<UserDataInterface> = ({name, email, role, status, gender}) => 
{
    const modalContext = useModal();
    
    return(
        <Box>
            <Typography>Edit User Record</Typography>
        </Box>
    );
}

export default EditUserModal;