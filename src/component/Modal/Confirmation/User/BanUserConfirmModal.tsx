import { Box, Button, Typography } from "@mui/material";
import { DeleteButton, ModalBodySyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import ModalTemplate from "../../../Templates/ModalTemplate";

const BanUserConfirmModal = () => 
{
    return(
        <ModalTemplate title={"Ban User Confirmation"} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to ban this account?</Typography>
            </Box>
            
            <Button sx={{...DeleteButton}}>Yes</Button>
        </ModalTemplate>
    );
}

export default BanUserConfirmModal