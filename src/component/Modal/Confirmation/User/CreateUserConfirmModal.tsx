import { Box, Typography } from "@mui/material";
import { useModal } from '../../../../Context/ModalContext';

// Context
import { useUserContext } from "../../../../Context/User/UserContext";

// UI Fragment
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";

// Template
import ModalTemplate from '../../../Templates/ModalTemplate';

// Another Modal
import CreateUserModal from "../../User/CreateUserModal";

// Data (CSS Synxax)
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

const CreateUserConfirmModal = ({...userData}) => 
{
    const {username, email, password, role, gender, birthDay} = userData;
    const birthDayToString = birthDay.toString();
 
    const { handleOpen, handleClose } = useModal();
    const { createUser } = useUserContext();

    const returnCreateUserModal = () => 
    {
        handleOpen(<CreateUserModal {...userData}/>);
    }

    const registerUser = () => 
    {
        createUser("UserManagementPanel", username, email, password, role, gender, birthDay);
        handleClose();
    }

    return(
        <ModalTemplate title={"Create Account Confirmation"} width="400px" cancelButtonName={"No"} cancelButtonEvent={returnCreateUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography sx={ModalSubTitleSyntax}>Do you want to create this account?</Typography>
                <Typography>Username: {username}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Password: {password}</Typography>
                <Typography>Role: {role}</Typography>
                <Typography>Gender: {gender}</Typography>
                <Typography>BirthDay: {birthDayToString}</Typography>
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={registerUser} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default CreateUserConfirmModal;
