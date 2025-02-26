import { FC } from "react";
import { ModalTemplateProps } from "../../Model/ContextAndProviderModel";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CreateModalSyntax, ModalSyntax, ModalTitleSyntax } from "../../Maps/FormatSyntaxMaps";
import { useModal } from "../../Context/ModalContext";

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
                <Button onClick={ButtonEvent} sx={{paddingLeft: '20px'}}>{cancelButtonName}</Button>
            </Box>
        </Modal>
    );
}

export default ModalTemplate