import { useState } from 'react'

import { Box, Typography } from "@mui/material";
import { useModal } from '../../../Context/ModalContext';


const EditProfileConfirmModal = (message: any) => 
{
    const [OpenModal, handleOpenModal] = useState(false);
    const modalContext = useModal();

    return(
        <Box>
            <Typography>Edit Profile Confirmation</Typography>
        </Box>
    );
}

export default EditProfileConfirmModal;