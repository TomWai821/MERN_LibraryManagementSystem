import { FC, useState } from 'react'

import { Box, Button, Typography } from "@mui/material";
import { useModal } from '../../../../Context/ModalContext';
import { ModalBodySyntax, ModalSubTitleSyntax } from '../../../../Maps/FormatSyntaxMaps';
import { EditConfirmInterface } from '../../../../Model/TablePageModel';
import ModalTemplate from '../../../Templates/ModalTemplate';


const EditProfileConfirmModal:FC<EditConfirmInterface> = ({editData, defaultData}) => 
{
    const modalContext = useModal();

    const onClick = () => 
    {

    }

    return(
        <ModalTemplate title={"Edit Profile Confirmation"} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to edit this profile record?</Typography>
            </Box>
            <Button variant='contained' onClick={onClick}>Yes</Button>
        </ModalTemplate>
    );
}

export default EditProfileConfirmModal;