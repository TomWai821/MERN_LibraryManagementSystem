import { FC } from "react";
import { ModalTemplateProps } from "../../Model/ContextAndProviderModel";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CreateModalSyntax, ModalSyntax, ModalTitleSyntax } from "../../Maps/FormatSyntaxMaps";
import { useModal } from "../../Context/ModalContext";

const ModalTemplate:FC <ModalTemplateProps> = ({children, title, CancelButtonName}) => 
{
    const {open, handleClose} = useModal();
    
    return(
        <Modal open={open} onClose={handleClose} >
            <Box sx={{...ModalSyntax, ...CreateModalSyntax}}>
                <Typography id="modal-title" sx={ModalTitleSyntax}>{title}</Typography>
                    {children}
                <Button onClick={handleClose} sx={{paddingLeft: '10px'}}>{CancelButtonName}</Button>
            </Box>
        </Modal>
    );
}

export default ModalTemplate