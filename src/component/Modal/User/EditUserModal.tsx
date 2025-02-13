import { FC } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserDataInterface } from '../../../Model/TablePageModel';
import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { Button } from '@mui/material';

const EditUserModal:FC<UserDataInterface> = ({...defaultData}) => 
{
    const {name, email, role, status, gender} = defaultData;
    const modalContext = useModal();
    
    return(
        <ModalTemplate title={"Edit User Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>

            </Box>
            <Button variant='contained'>Edit</Button>
        </ModalTemplate>
    );
}

export default EditUserModal;