import { Box, Button, Typography } from "@mui/material";
import { useModal } from '../../../../Context/ModalContext';
import { DeleteButton, ModalBodySyntax, ModalSubTitleSyntax } from '../../../../Maps/FormatSyntaxMaps';
import ModalTemplate from '../../../Templates/ModalTemplate';

const DeleteProfileConfirmModal = () => 
{
    const {handleOpen} = useModal();

    return(
        <ModalTemplate title={"Delete Account Confirmation"} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to delete this account?</Typography>
            </Box>
            
            <Button sx={{...DeleteButton}}>Yes</Button>
        </ModalTemplate>
    );
}

export default DeleteProfileConfirmModal;