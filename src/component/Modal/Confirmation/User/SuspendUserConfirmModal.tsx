import { FC } from "react";
import { Box, Typography } from "@mui/material";

// UI Fragment
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";

// Template
import ModalTemplate from "../../../Templates/ModalTemplate";

// Model
import { SuspendModalInterface } from "../../../../Model/ModelForModal";

// Context
import { useModal } from "../../../../Context/ModalContext";
import { useUserContext } from "../../../../Context/User/UserContext";

// Another Modal
import SuspendUserModal from "../../User/SuspendUserModal";

// Data (CSS Syntax and dropdown data)
import { ModalBodySyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { dateOption } from "../../../../ArraysAndObjects/TextFieldsArrays";
import ExpandableTypography from "../../../UIFragment/ExpandableTypography";

const SuspendUserConfirmModal:FC<SuspendModalInterface> = (banData) => 
{
    const { _id, username, durationOption, description } = banData;
    const { handleOpen, handleClose } = useModal();
    const { changeUserStatus } = useUserContext();

    const returnSuspendUserModal = () => 
    {
        handleOpen(<SuspendUserModal username={username} _id={_id} durationOption={durationOption} description={description}/>);
    }


    const SuspendUser = (_id:string, duration:number, description:string) => 
    {
        changeUserStatus("Suspend", _id, "Suspend", undefined, duration, description);
        handleClose();
    }

    return(
        <ModalTemplate title={"Suspend User Confirmation"} width="400px" cancelButtonName={"No"}  cancelButtonEvent={returnSuspendUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to suspend {username}?</Typography>
                <Typography>Duration: {dateOption[durationOption as number].label}</Typography>
                <ExpandableTypography title={"Description"}>{description}</ExpandableTypography>
            </Box>
            
            <ModalConfirmButton clickEvent={() => SuspendUser(_id, dateOption[durationOption as number].value, description as string)} name={"Yes"} buttonType={"Important"}/>
        </ModalTemplate>
    );
}

export default SuspendUserConfirmModal