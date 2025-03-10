import { Box, Button, Typography } from "@mui/material";

// Template
import ModalTemplate from '../../../Templates/ModalTemplate';

// Context
import { useModal } from '../../../../Context/ModalContext';

// Data (CSS syntax)
import { DeleteButton, ModalBodySyntax, ModalSubTitleSyntax } from '../../../../Maps/FormatSyntaxMaps';

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