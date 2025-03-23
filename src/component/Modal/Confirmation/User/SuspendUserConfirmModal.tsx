import { FC } from "react";
import { Box, Typography } from "@mui/material";

// UI Fragment
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";

// Template
import ModalTemplate from "../../../Templates/ModalTemplate";

// Model
import { BanModalInterface } from "../../../../Model/ModelForModal";

// Context
import { useModal } from "../../../../Context/ModalContext";
import { useUserContext } from "../../../../Context/User/UserContext";

// Another Modal
import BanUserModal from "../../User/SuspendUserModal";

// Data (CSS Syntax and dropdown data)
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { dateOption } from "../../../../ArraysAndObjects/TextFieldsArrays";

const SuspendUserConfirmModal:FC<BanModalInterface> = (banData) => 
{
    const { _id, username, durationOption, description } = banData;
    const { handleOpen, handleClose } = useModal();
    const { changeUserStatus } = useUserContext();

    const returnBanUserModal = () => 
    {
        handleOpen(<BanUserModal username={username} _id={_id} durationOption={durationOption} description={description}/>);
    }


    const BanUser = (_id:string, duration:number, description:string) => 
    {
        changeUserStatus("Banned", _id, "Banned", undefined, duration, description);
        handleClose();
    }

    return(
        <ModalTemplate title={"Suspend User Confirmation"} width="400px" cancelButtonName={"No"}  cancelButtonEvent={returnBanUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to ban {username}?</Typography>
                <Typography>Duration: {dateOption[durationOption as number].label}</Typography>
                <Typography>Description: {description}</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={() => BanUser(_id, dateOption[durationOption as number].value, description as string)} name={"Yes"} buttonType={"Important"}/>
        </ModalTemplate>
    );
}

export default SuspendUserConfirmModal