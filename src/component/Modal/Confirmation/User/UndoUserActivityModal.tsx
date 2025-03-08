import { Box,  Button, Typography } from "@mui/material";
import ModalTemplate from "../../../Templates/ModalTemplate";
import DeleteTypography from "../../../UIFragment/Typography/DeleteTypography";
import { FC } from "react";
import { DeleteModalInterface } from "../../../../Model/TablePageModel";
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import { useBannedUserContext } from "../../../../Context/User/BannedUserContext";

const UndoUserActivityModal:FC<DeleteModalInterface> = ({...userData}) => 
{

    const { _id, value, username, email, role, gender, bannedDetails } = userData;
    const { changeBannedUserStatus } = useBannedUserContext();

    const UnbanUser = () => 
    {
        switch(value)
        {
            case 1:
                //changeBannedUserStatus();
                break;
            
            case 2:
                break;
        }
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
            <Button variant='contained' onClick={() => {}}>Yes</Button>
        </ModalTemplate>
    );
}

export default UndoUserActivityModal;