import { FC } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';


const CreateBookModal:FC = ({}) => 
{
    return(
        <Box>
            <Typography>Create Book Record</Typography>

            <Box>
                <InputLabel></InputLabel>
                <TextField></TextField>
            </Box>
        </Box>
    );
}

export default CreateBookModal;