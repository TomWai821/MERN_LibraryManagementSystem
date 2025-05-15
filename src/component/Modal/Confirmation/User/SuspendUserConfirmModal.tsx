import { FC, useContext } from "react";
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
import { AlertContext } from "../../../../Context/AlertContext";

const SuspendUserConfirmModal:FC<SuspendModalInterface> = (banData) => 
{
    const { _id, username, durationOption, description } = banData;
    const { handleOpen, handleClose } = useModal();
    const { changeUserStatus } = useUserContext();
    const alertContext = useContext(AlertContext);

    const returnSuspendUserModal = () => 
    {
        handleOpen(<SuspendUserModal username={username} _id={_id} durationOption={durationOption} description={description}/>);
    }


    const SuspendUser = async (_id:string, duration:number, description:string) => 
    {
        const response = changeUserStatus("Suspend", _id, "Suspend", undefined, duration, description);
         
        if (alertContext && alertContext.setAlertConfig) 
        {
            if (await response) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: `Suspend user successfully!`, open: true, onClose: () => alertContext.setAlertConfig(null) });
                setTimeout(() => { handleClose() }, 2000);
            } 
            else 
            {
                alertContext.setAlertConfig({ AlertType: "error", Message: `Failed to Suspend user! Please try again later`, open: true, onClose: () => alertContext.setAlertConfig(null) });
            }
        }
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