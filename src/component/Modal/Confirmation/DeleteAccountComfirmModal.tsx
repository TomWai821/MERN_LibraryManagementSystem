import { useState } from 'react'

import { Box, Button, Typography } from "@mui/material";
import { useModal } from '../../../Context/ModalContext';

const ButtonInfo = [
    {buttonName: 'Yes', BackgroundColor: ''},
    {buttonName: 'No', BackgroundColor: ''}
]

const buttonFontColor = 'white';

const DeleteAccountConfirmModal = (message: any) => 
{
    const [OpenModal, handleOpenModal] = useState(false);
    const modalContext = useModal();

    return(
        <Box>
            <Typography>Delete Profile Confirmation</Typography>
            Do you want to delete this account?
            Remarks: This action could not be undone
            {
                ButtonInfo.map((button) => 
                (
                    <Button sx={{backgroundColor: button.BackgroundColor, color: buttonFontColor}}>{button.buttonName}</Button>
                ))
            }
        </Box>
    );
}

export default DeleteAccountConfirmModal;