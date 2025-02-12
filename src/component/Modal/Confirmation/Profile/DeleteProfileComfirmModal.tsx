import { useState } from 'react'

import { Box, Button, Typography } from "@mui/material";
import { useModal } from '../../../../Context/ModalContext';
import { DeleteButton, ModalBodySyntax } from '../../../../Maps/FormatSyntaxMaps';
import DeleteTypography from '../../DeleteTypography';
import ModalTemplate from '../../../Templates/ModalTemplate';

const DeleteProfileConfirmModal = () => 
{
    const {handleOpen} = useModal();

    return(
        <ModalTemplate title={"Delete Account Confirmation"} CancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography>Do you want to delete this account?</Typography>
            </Box>

            <Button sx={{...DeleteButton}}>Yes</Button>
        </ModalTemplate>
    );
}

export default DeleteProfileConfirmModal;