import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";

// Template
import ModalTemplate from "../../../Templates/ModalTemplate";

// Context
import { useModal } from "../../../../Context/ModalContext";
import { useAllUserContext } from "../../../../Context/User/AllUserContext";
import { useBannedUserContext } from "../../../../Context/User/BannedUserContext";
import { BanModalInterface } from "../../../../Model/UserTableModel";

// Another Modal
import BanUserModal from "../../User/BanUserModal";

// Data (CSS Syntax and dropdown data)
import { DeleteButton, ModalBodySyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import { dateOption } from "../../../../Maps/TextFieldsMaps";

const BanUserConfirmModal:FC<BanModalInterface> = (banData) => 
{
    const { _id, username, durationOption, description } = banData;
    const {handleOpen, handleClose} = useModal();
    const {changeUserStatus, fetchAllUser} = useAllUserContext();
    const {fetchAllBannedUser} = useBannedUserContext();

    const returnBanUserModal = () => 
    {
        handleOpen(<BanUserModal username={username} _id={_id} durationOption={durationOption} description={description}/>);
    }


    const BanUser = (_id:string, duration:number, description:string) => 
    {
        changeUserStatus(_id, "Banned", duration, description);
        fetchAllBannedUser();
        fetchAllUser();
        handleClose();
    }

    return(
        <ModalTemplate title={"Ban User Confirmation"} cancelButtonName={"No"}  cancelButtonEvent={returnBanUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to ban {username}?</Typography>
                <Typography>Duration: {dateOption[durationOption as number].label}</Typography>
                <Typography>Description: {description}</Typography>
            </Box>
            
            <Button onClick={() => BanUser(_id, dateOption[durationOption as number].value, description as string)} sx={{...DeleteButton}}>Yes</Button>
        </ModalTemplate>
    );
}

export default BanUserConfirmModal