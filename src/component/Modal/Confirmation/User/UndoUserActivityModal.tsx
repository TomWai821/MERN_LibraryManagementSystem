import { Box,  Button, Typography } from "@mui/material";
import ModalTemplate from "../../../Templates/ModalTemplate";
import DeleteTypography from "../../../UIFragment/Typography/DeleteTypography";
import { FC } from "react";
import { DeleteModalInterface } from "../../../../Model/TablePageModel";
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import { useBannedUserContext } from "../../../../Context/User/BannedUserContext";
import { useModal } from "../../../../Context/ModalContext";
import { useAllUserContext } from "../../../../Context/User/AllUserContext";
import { useDeleteUserContext } from "../../../../Context/User/DeleteUserContext";

const UndoUserActivityModal:FC<DeleteModalInterface> = ({...userData}) => 
{

    const { _id, value, username, email, role, gender, bannedDetails, deleteDetails } = userData;
    const { changeBannedUserStatus, fetchAllBannedUser } = useBannedUserContext();
    const { changeDeleteUserStatus } = useDeleteUserContext();
    const { fetchAllUser } = useAllUserContext();
    const { handleClose } = useModal();

    const UndoActionForUser = () => 
    {
        switch(value)
        {
            case 1:
                changeBannedUserStatus(_id, bannedDetails?._id as string);
                break;
            
            case 2:
                changeDeleteUserStatus(_id, deleteDetails?._id as string, "Undo");
                fetchAllBannedUser();
                break;
        }
        fetchAllUser();
        handleClose();
    }
 
    const setTitle = () => 
    {
        switch(value)
        {
            case 1:
                return "UnBan User Confirmation";
            
            case 2:
                return "UnDelete User Confirmation";
        }
    }

    const setSubTitle = () =>
    {
        switch(value)
        {
            case 1:
                return "Do you want to unban this user?";
            
            case 2:
                return "Do you want to undelete this user?";
        }
    }

    return(
        <ModalTemplate title={setTitle() as string} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{setSubTitle()}</Typography>
                <Typography>Username: {username}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Role: {role}</Typography>
                <Typography>Gender: {gender}</Typography>
                <Typography>Description: {bannedDetails?.description}</Typography>
            </Box>
            
            <DeleteTypography/>
            <Button variant='contained' onClick={UndoActionForUser}>Yes</Button>
        </ModalTemplate>
    );
}

export default UndoUserActivityModal;