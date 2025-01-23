import { FC } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';

const EditBookModal:FC = ({}) => 
{
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