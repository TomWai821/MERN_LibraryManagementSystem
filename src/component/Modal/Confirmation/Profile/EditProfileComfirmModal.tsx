import { FC, useState } from 'react'

import { Box, Button, Typography } from "@mui/material";
import { useModal } from '../../../../Context/ModalContext';
import { ModalBodySyntax } from '../../../../Maps/FormatSyntaxMaps';
import { ConfirmInterface } from '../../../../Model/TablePageModel';
import ModalTemplate from '../../../Templates/ModalTemplate';


const EditProfileConfirmModal:FC<ConfirmInterface> = ({editData, defaultData}) => 
{
    const modalContext = useModal();

    const onClick = () => 
    {

    }

    return(
        <ModalTemplate title={"Edit Profile Confirmation"} CancelButtonName={"No"}>
            <Typography>Do you want to edit this profile record?</Typography>
            <Box id="modal-description" sx={ModalBodySyntax}>

            </Box>
            <Button variant='contained' onClick={onClick}>Yes</Button>
        </ModalTemplate>
    );
}

export default EditProfileConfirmModal;