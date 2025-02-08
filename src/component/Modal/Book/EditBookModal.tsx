import { FC } from 'react'

import { Box, TextField, Typography, InputLabel } from '@mui/material';
import { useModal } from '../../../Context/ModalContext';

const EditBookModal:FC = ({}) => 
{
    const modalContext = useModal();
    
    return(
        <Box>
            <Typography>Edit Book Record</Typography>

            <Box>
                <InputLabel></InputLabel>
                <TextField></TextField>
            </Box>
        </Box>
    );
}

export default EditBookModal;