
import { FC } from "react";
import { Box,  Typography } from "@mui/material";

// Template
import ModalTemplate from "../../../Templates/ModalTemplate";

// UI Fragnemt
import DeleteTypography from "../../../UIFragment/DeleteTypography";
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";

// Context
import { useModal } from "../../../../Context/ModalContext";
import { useUserContext } from "../../../../Context/User/UserContext";

// Model
import { DeleteModalInterface } from "../../../../Model/ModelForModal";

// Data (CSS Syntax)
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import { UserResultDataInterface } from "../../../../Model/ResultModel";

const UndoUserActivityModal:FC<DeleteModalInterface> = ({...userData}) => 
{

    const { _id, value, data } = userData;
    const Data = data as UserResultDataInterface;
    
    const { changeUserStatus } = useUserContext();
    const { handleClose } = useModal();

    const UndoUserAction = () => 
    {
        switch(value)
        {
            case 1:
                changeUserStatus("UnBanned", _id, "Normal", Data.bannedDetails?._id as string);
                break;
            
            case 2:
                changeUserStatus("UnDelete", _id, "Normal", Data.deleteDetails?._id as string);
                break;
        }
        handleClose();
    }
 
    const setTitle = () => 
    {
        let Titles = {Title: "", subTitle: ""};
        switch(value)
        {
            case 1:
                Titles.Title = "UnBan User Confirmation";
                Titles.subTitle = "Do you want to unban this account?"
                break;
            
            case 2:
                Titles.Title = "UnDelete User Confirmation";
                Titles.subTitle = "Do you want to undelete this user?";
        }
        return Titles;
    }

    return(
        <ModalTemplate title={setTitle().Title} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{setTitle().subTitle}</Typography>
                <Typography>Username: {Data.username}</Typography>
                <Typography>Email: {Data.email}</Typography>
                <Typography>Role: {Data.role}</Typography>
                <Typography>Gender: {Data.gender}</Typography>
                <Typography>Description: {Data.bannedDetails?.description || Data.deleteDetails?.description}</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={UndoUserAction} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default UndoUserActivityModal;