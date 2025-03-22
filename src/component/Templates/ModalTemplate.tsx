import { FC } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

// Context
import { useModal } from "../../Context/ModalContext";

// Models
import { ModalTemplateProps } from "../../Model/ContextAndProviderModel";

// Data(CSS Syntax)
import { CreateModalSyntax, ModalSyntax, ModalTitleSyntax } from "../../ArraysAndObjects/FormatSyntaxObjects";

const ModalTemplate:FC <ModalTemplateProps> = (templateData) => 
{
    const {children, title, cancelButtonName, cancelButtonEvent} = templateData;
    const {open, handleClose} = useModal();

    const ButtonEvent = () =>
    {
        cancelButtonEvent ? cancelButtonEvent() : handleClose();
    }
    
    return(
        <Modal open={open} onClose={handleClose} >
            <Box sx={{...ModalSyntax, ...CreateModalSyntax}}>
                <Typography id="modal-title" sx={ModalTitleSyntax}>{title}</Typography>
                    {children}
                <Button onClick={ButtonEvent}>{cancelButtonName}</Button>
            </Box>
        </Modal>
    );
}

export default ModalTemplate