import { useState } from 'react'

import { Box, Typography } from "@mui/material";


const EditProfileConfirmModal = (message: any) => 
{
    const [OpenModal, handleOpenModal] = useState(false);

    return(
        <Box>
            <Typography>Edit Profile Confirmation</Typography>
        </Box>
    );
}

export default EditProfileConfirmModal;