import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';

const CreateUserModal:FC = ({}) => 
{
    const modalContext = useModal();
    
    return(
        <ModalTemplate title={"Create User Record"} CancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}></Box>
        </ModalTemplate>
    );
}

export default CreateUserModal;