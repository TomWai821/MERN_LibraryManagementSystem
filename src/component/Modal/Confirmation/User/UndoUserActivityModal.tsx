
import { FC } from "react";
import { Box,  Typography } from "@mui/material";

// Template
import ModalTemplate from "../../../Templates/ModalTemplate";

// UI Fragnemt
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";

// Context
import { useModal } from "../../../../Context/ModalContext";
import { useUserContext } from "../../../../Context/User/UserContext";

// Model
import { DeleteModalInterface } from "../../../../Model/ModelForModal";

// Data (CSS Syntax)
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { UserResultDataInterface } from "../../../../Model/ResultModel";

const UndoUserActivityModal:FC<DeleteModalInterface> = ({...userData}) => 
{

    const { _id, data } = userData;
    const Data = data as UserResultDataInterface;
    
    const { changeUserStatus } = useUserContext();
    const { handleClose } = useModal();

    const UndoUserAction = () => 
    {
        changeUserStatus("UnSuspend", _id, "Normal", Data.bannedDetails?._id as string);
        handleClose();
    }
 
    return(
        <ModalTemplate title={"Unsuspend User Confirmation"} width="400px" cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{"Do you want to unsuspend this account?"}</Typography>
                <Typography>Username: {Data.username}</Typography>
                <Typography>Email: {Data.email}</Typography>
                <Typography>Role: {Data.role}</Typography>
                <Typography>Gender: {Data.gender}</Typography>
                <Typography>Description: {Data.bannedDetails?.description}</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={UndoUserAction} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default UndoUserActivityModal;