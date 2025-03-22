import { FC } from 'react'
import { Box, Button, Typography } from "@mui/material";

import { useModal } from '../../../../Context/ModalContext';

import ModalTemplate from '../../../Templates/ModalTemplate';

import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";


const EditProfileConfirmModal:FC<{}> = ({}) => 
{
    const {handleOpen} = useModal();

    const onClick = () => 
    {
        handleOpen(<></>);
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